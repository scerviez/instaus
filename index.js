const Insta = require('@androz2091/insta.js');
const axios = require('axios')
const { performance } = require('perf_hooks')
const client = new Insta.Client();

client.on('connected', () => {
    console.log(`Logged in as ${client.user.username}`);
});

client.on('messageCreate', async function(ctx) {
       var text = ctx.content;
       if (RegExp(".ping", "i").exec(text)) {
           let t0 = performance.now();
           let t1 = performance.now();
           let diff = ((t1 - t0) / 1000).toLocaleString('id-ID', { maximumFractionDigits: 3 });
           let message = `Pong!\nIn <code>${diff}</code> seconds.`
           return ctx.reply(message)
       }
       if (RegExp('.help',"i").exec(text)){
           return ctx.reply('Available Command\n .ping .help .google .lirik')
       }                                                                                                 
       if (RegExp(".lirik", 'i').exec(text)) {                                                                               
           var reqy = await axios.get(`https://lyrics-api.xlaaf.repl.co/search?q=${text.replace(/([.*kbbi ])/ig,"")}`)
           var message = 'Ditemukan: '+reqy.data.data
           return ctx.reply(message)
       }
       if (RegExp(".google ", "i").exec(text)) {
           var data = await axios.get(`https://google-api.xlaaf.repl.co/search?q=${text.replace(/([.*google ])/ig,"")}`)
           var ok = data.data.data
           var hai = ok[Math.floor(Math.random() * (ok.length))] 
           var judul = hai.title
           var link = hai.link
           var desk = hai.desk
           var pesan = 'Ditemukan : '+text+'\n'+judul+'\nUrl: '+link+'\nDeskripsi: '+desk
            return ctx.reply(pesan);
       }
       if (RegExp(".del ", "i").exec(text)) {
           let ps = ctx.id
           return ctx.delete(ps)
       }
});

client.login(process.env.username, process.env.password);
