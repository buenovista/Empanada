const Discord = require("discord.js");
const userlist = require("../users.json")
const config = require("../config.json")
const productlist = require("../products.json")
const fs = require("fs");

exports.run = async (client, message, args) => {

    const invalid = new Discord.RichEmbed()
    .setColor(0x8e24aa)
    .setTitle(`Error`)
    .setDescription(`Please order something! #order **product-id**`)
    .setFooter(`Powered by Project Empanada`)

    if(!userlist[message.author.id]){
        return message.channel.send(invalid)
    };

    const info = new Discord.RichEmbed()
    .setColor(0x8e24aa)
    .setTitle(`Canceled`)
    .setDescription(`Your order has been canceled.`)
    .setFooter(`Powered by Project Empanada`)

     message.channel.send(info)

     delete userlist[message.author.id]; // Deletes the Guild ID and Prefix
     fs.writeFile('./users.json', JSON.stringify(userlist, null, 2), (err) => {
      if (err) console.log(err)
     })

  }