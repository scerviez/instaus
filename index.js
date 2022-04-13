//const Insta = require('@androz2091/insta.js');
const Insta = require('./insta.js');
const axios = require('axios')
const pack = require('packagescrapers')
const { performance } = require('perf_hooks')
const client = new Insta.Client();

client.on('connected', () => {
    console.log(`Login Sebagai ${client.user.username} Followes ${client.user.followerCount}`);
});                                            
 
client.on('pendingRequest', ctx => {
        ctx.approve();
});

client.on('messageDelete', ctx => {
        //ctx.reply(`${client.user.username} Telah menghapus pesannya Pesan: ${ctx.content}`)
        console.log(`${client.user.username} Telah menghapus pesannya Pesan: ${ctx.content}`)
});
        
client.on('newFollower', ctx => {
        console.log(`Seseorang Baru saja mengikutimu`)
});

client.on('messageCreate', async function(ctx) {
           var text = ctx.content;
           let ve = text.split(" ");
           ve.shift();
           pow = ve.join(" ");
       if (RegExp(".ping", "i").exec(text)) {
           let t0 = performance.now();
           let t1 = performance.now();
           let diff = ((t1 - t0) / 1000).toLocaleString('id-ID', { maximumFractionDigits: 3 });
           let message = `Pong!\nIn ${diff} seconds.`
           return ctx.reply(message)
       }
       if (RegExp('.help',"i").exec(text)){
           return ctx.reply('Available Command\n .ping .help .google .lirik .p .npm .ssweb')
       }                                                                                                 
       if (RegExp(".lirik", 'i').exec(text)) {                                                                               
           var reqy = await axios.get(`https://lyrics-api.xlaaf.repl.co/search?q=${pow}`)
           var message = 'Ditemukan: '+reqy.data.data
           return ctx.reply(message)
       }
       if (RegExp(".google ", "i").exec(text)) {
           var data = await axios.get(`https://google-api.xlaaf.repl.co/search?q=${pow}`)
           var ok = data.data.data
           var hai = ok[Math.floor(Math.random() * (ok.length))] 
           var judul = hai.title
           var link = hai.link
           var desk = hai.desk
           var pesan = 'Ditemukan : '+text+'\n'+judul+'\nUrl: '+link+'\nDeskripsi: '+desk
            return ctx.reply(pesan);
       }
       if (new RegExp(".kbbi", "i").exec(text)) {
           const kb = await axios.get(`https://kbbi-api.xlaaf.repl.co/search?kata=${pow}`)
           const bi = kb.data.data.arti
           return await ctx.reply('Kata: '+text+'\nArti: '+bi)
       } 
       if (new RegExp(".p", "i").exec(text)) {
           var pe = await axios.get(`https://pixabay.com/api/?key=${process.env.pixkey}&q=${pow}`)
           var ok = pe.data.hits
           var hai = ok[Math.floor(Math.random() * (ok.length))]                                                                                                                                                                                                        
           return await ctx.chat.sendPhoto(hai.previewURL)
       }
       if (new RegExp(".npm", "i").exec(text)) {
           var txt = text
           let inputArray = input.split(" ");
               inputArray.shift();
              pesan = inputArray.join(" "); 
           var ok = pack.npm(pesan)
           var hai = ok[Math.floor(Math.random() * (ok.length))] 
           var wk = hai.title
           var link = hai.link
           return await ctx.reply(`Package Name: ${wk}\nLink Package: ${link}`)
       }
       if (new RegExp(".ssweb", "i").exec(text)) {
           return await ctx.chat.sendPhoto('https://api.apiflash.com/v1/urltoimage?access_key='+apiflashkey+'&url='+pow)
       } 
});

client.login(process.env.username, process.env.password);
