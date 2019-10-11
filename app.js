const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const Enmap = require("enmap");

const config = require('./config.json');
client.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

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
  
client.login('NTA5NzkyNTQzNjMwODE5MzQ4.XaDbMA.kbbtLrmcAx6mderud96wtg8X3CA');
