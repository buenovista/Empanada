const Discord = require("discord.js")
const productlist = require("../products.json")
const fs = require("fs")
const config = require("../config.json")
const jsonUpdate = require("update-json-file")
const path = require("path")

exports.run = async (client, message, args) => {

    if(message.author.id !== config.ownerid) {
        let embed = new Discord.RichEmbed()
        .setColor(config.gColor)
        .setTitle(`Error`)
        .setDescription(`Only owners can set product's configuration`)
        .setFooter(config.eFooter)
        message.channel.send(embed)
        return;
    } else {
        if(!args[0] || !productlist.hasOwnProperty(args[0])) {
            let embed = new Discord.RichEmbed()
            .setTitle(`Error`)
            .setDescription(`You need to provide a valid product id`)
            .setColor(config.gColor)
            .setFooter(config.eFooter)
            return message.channel.send(embed)
        } else {
            if(!args[1] || !args[1] === "pname" || !args[1] === "buttonid" || !args[1] === "status" || !args[1] === "price") {
                let embed = new Discord.RichEmbed()
                .setTitle(`Error`)
                .setColor(config.gColor)
                .setDescription(`You need to provide a valid property to change.\nAllowed properties: **pname, status, buttonid, price**`)
                .setFooter(config.eFooter)
                return message.channel.send(embed)
            } else {
                if(!args[2]) {
                    let embed = new Discord.RichEmbed()
                    .setTitle(`Error`)
                    .setColor(config.gColor)
                    .setDescription(`Provide a valid new value to set`)
                    .setFooter(config.eFooter)
                    return message.channel.send(embed)
                } 
                let embed = new Discord.RichEmbed()
                .setTitle(`Value changed`)
                .setDescription(`The value of \`${args[1]}\` has been changed to \`${args.slice(2).join(" ")}\``)
                .setColor(config.gColor)
                .setFooter(config.eFooter)
                jsonUpdate(path.join(__filename, '../../products.json'), (data) => {

                    data.args[0].args[1] = args.slice(2).join(" ")

                    /*
                    ** args[0] = Product's id
                    ** args[1] = Product's property
                    ** args.slice(2).join(" ") = Property's new value
                    ** This file is currently under developement, nothing here will work at 100%.
                    ** Made with love, Project Empanada <3
                    */
               }).then(message.channel.send(embed))
            }
        } 
    }
    }
