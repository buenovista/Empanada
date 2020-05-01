const Discord = require("discord.js");
const userlist = require("../users.json")
const productlist = require("../products.json")
const fs = require("fs");

exports.run = async (client, message, args) => {

    const prdct1 = productlist['VDLAT-PS-0001'].pname + " | VDLAT-PS-0001"
    const price1 = productlist['VDLAT-PS-0001'].price
    const prdct2 = productlist['VDLAT-PS-0002'].pname + " | VDLAT-PS-0002"
    const price2 = productlist['VDLAT-PS-0002'].price
    const prdct3 = productlist['VDLAT-PS-0003'].pname + " | VDLAT-PS-0003"
    const price3 = productlist['VDLAT-PS-0003'].price
    const prdct4 = productlist['VDLAT-PS-0004'].pname + " | VDLAT-PS-0004"
    const price4 = productlist['VDLAT-PS-0004'].price
    const prdct5 = productlist['VDLAT-PS-0005'].pname + " | VDLAT-PS-0005"
    const price5 = productlist['VDLAT-PS-0005'].price
    const prdct6 = productlist['VDLAT-PS-0006'].pname + " | VDLAT-PS-0006"
    const price6 = productlist['VDLAT-PS-0006'].price
    const prdct7 = productlist['VDLAT-PS-0007'].pname + " | VDLAT-PS-0007"
    const price7 = productlist['VDLAT-PS-0007'].price
    const prdct8 = productlist['VDLAT-PS-0008'].pname + " | VDLAT-PS-0008"
    const price8 = productlist['VDLAT-PS-0008'].price

    //yeah, ik this is a mess lmao

    const invformat = new Discord.RichEmbed()
    .setColor(0x8e24aa)
    .setTitle(`Products`)
    .setDescription(`\n${prdct1} - ${price1} \n${prdct2} - ${price2} \n${prdct3} - ${price3} \n${prdct4} - ${price4} \n${prdct5} - ${price5} \n${prdct6} - ${price6} \n${prdct7} - ${price7} \n${prdct8} - ${price8}`)
    .setFooter(`Powered by Project Empanada`)

    message.channel.send(invformat)

  }