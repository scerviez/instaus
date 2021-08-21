//const Insta = require('@androz2091/insta.js');
const Insta = require('./insta.js');
const axios = require('axios')
const { performance } = require('perf_hooks')
const client = new Insta.Client();

client.on('connected', () => {
    console.log(`Login Sebagai ${client.user.username} Followes ${client.user.followerCount}`);
});                                            
 
client.on('pendingRequest', ctx => {
        ctx.approve();
});

client.on('messageDelete', ctx => {
        ctx.reply(`${client.user.username} Telah menghapus pesannya Pesan: ${ctx.content}`)
});
                                   
client.on('messageCreate', async function(ctx) {
       if (!ctx.author.id === !client.user.id) return
           var text = ctx.content;
       if (RegExp(".ping", "i").exec(text)) {
           let t0 = performance.now();
           let t1 = performance.now();
           let diff = ((t1 - t0) / 1000).toLocaleString('id-ID', { maximumFractionDigits: 3 });
           let message = `Pong!\nIn ${diff} seconds.`
           return ctx.reply(message)
       }
       if (RegExp('.help',"i").exec(text)){
           return ctx.reply('Available Command\n .ping .help .google .lirik')
       }                                                                                                 
       if (RegExp(".lirik", 'i').exec(text)) {                                                                               
           var reqy = await axios.get(`https://lyrics-api.xlaaf.repl.co/search?q=${text.replace(/([.*lirik ])/ig,"")}`)
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
       if (new RegExp(".kbbi", "i").exec(text)) {
           const kb = await axios.get(`https://kbbi-api.xlaaf.repl.co/search?kata=${text.replace(/([.*kbbi ])/ig,"")}`)
           const bi = kb.data.data.arti
           return await ctx.reply('Kata: '+text+'\nArti: '+bi)
       }
       if (RegExp('.block',"i").exec(text)){
           client.user.block();
       }  
});

client.login(process.env.username, process.env.password);
