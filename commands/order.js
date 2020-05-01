const Discord = require("discord.js");
const userlist = require("../users.json")
const config = require("../config.json")
const productlist = require("../products.json")
const fs = require("fs");

exports.run = async (client, message, args) => {

    const invalid = new Discord.RichEmbed()
    .setColor(0x8e24aa)
    .setTitle(`Error`)
    .setDescription(`Please select a product/package. ${config.prefix}products`)
    .setFooter(`Powered by Project Empanada`)

    const notfound = new Discord.RichEmbed()
    .setColor(0x8e24aa)
    .setTitle(`Error`)
    .setDescription(`We couldn't find that product.`)
    .setFooter(`Powered by Project Empanada`)

    if (message.channel.type !== "dm") return message.channel.send("You can't run this command in a server. Go to DMs");

    if (args.length === 0)
    return message.channel.send(invalid)

    let noprdct = args.slice(0).join(' ');

    if(!productlist[noprdct]){
        return message.channel.send(notfound)
    };

    const name = productlist[noprdct].pname
    const price = productlist[noprdct].price

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

     function purchaseid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    const vcode = (makeid(10));

    const pcode = (purchaseid(10));

    if (!userlist[message.author.id]) { // If the guild's id is not on the GUILDCONF File, proceed
    userlist[message.author.id] = {
    username: message.author.username,
    discrim: message.author.discriminator,
    oaproduct: noprdct,
    completepurchase: pcode,
    authcode: vcode
    }
    }
     fs.writeFile('./users.json', JSON.stringify(userlist, null, 2), (err) => {
     if (err) console.log(err)
    })

    const info = new Discord.RichEmbed()
    .setColor(0x8e24aa)
    .setTitle(`Review and Checkout`)
    .setDescription(`***Order Summary***\nProduct: ${name} (${noprdct})\nTotal: ${price}\n\n[Checkout](${config.prtcl}://${config.website}/checkout/${message.author.id}/${message.author.username}/${message.author.discriminator}/${vcode}/${noprdct})`)
    .setFooter(`Powered by Project Empanada`)

     message.channel.send(info)

  }