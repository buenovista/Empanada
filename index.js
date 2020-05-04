const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
var https = require('https')
const express = require('express');
const app = express();
const products = require("./users.json");
const userlist = require("./products.json")

const client = new Discord.Client();
const config = require("./config.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;


//this is important af, don't remove it

let logo = config.logo
let bg = config.bg
let color = config.color //With this you can change the text color. Go to https://materializecss.com/color.html#palette to see all the colors.
let version = config.version
let projectname = config.projectname
let copy = config.copyright

//this is important af, don't remove it


fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

app.set('view engine', 'pug');

//  success

app.get('/success/', function(req, res, next) {

    res.render('success', {'wcolor': color, 'copy': copy, 'version': version, 'project': projectname, 'logo': clogo, 'bg': bg, 'color': color})

});

//  success



//  canceled

app.get('/cancel/', function(req, res, next) {

  res.render('cancel', {'wcolor': color, 'copy': copy, 'version': version, 'project': projectname, 'logo': clogo, 'bg': bg, 'color': color})

});

//  canceled



//  home

app.get('/', function(req, res, next) {

  res.render('home', {'wcolor': color, 'copy': copy, 'version': version, 'project': projectname, 'logo': clogo, 'bg': bg, 'color': color})

});

//  home


//  Checkout

app.get('/checkout/:id/:name/:discrim/:ut/:product', function(req, res, next) {
  const price = products[req.params.product].price
  const pname = products[req.params.product].pname
  const paypalid = products[req.params.product].buttonid
  const pstatus = products[req.params.product].status

  if(!userlist[req.params.id]){
    return res.render('invalidid', {'wcolor': color, 'copy': copy, 'version': version, 'project': projectname, 'logo': clogo, 'bg': bg, 'color': color})
};

if (pstatus == "disabled"){
  return res.send(`Oops! Product unavailable.`)
}

  if (userlist[req.params.id].authcode !== req.params.ut){
    return res.render('autherror', {'wcolor': color, 'copy': copy, 'version': version, 'project': projectname, 'logo': clogo, 'bg': bg, 'color': color})
  }


  res.render('checkoutscreen', {'wcolor': color, 'copy': copy, 'version': version, 'project': projectname, 'logo': clogo, 'bg': bg, 'color': color, 'price': price, 'pname': pname, 'paypalid': paypalid,'username': req.params.name, 'discrim': req.params.discrim, 'ut': req.params.ut, 'product': req.params.product});
});

//  Checkout




https.createServer({
  key: fs.readFileSync('./ssl/private.key'),
  cert: fs.readFileSync('./ssl/certificate.crt')
}, app)
.listen(2083, function () {
  console.log('Empanada is listening on port 2083! Go to https://localhost:3000/')
})

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token);
