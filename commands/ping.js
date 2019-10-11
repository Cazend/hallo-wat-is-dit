const Discord = require("discord.js"); 

module.exports.run = async (client, message, args) => {

let embed = new Discord.RichEmbed() 
.setTitle("Pong! :ping_pong:") 
.addField("Latency", `${client.ping}ms`)

message.channel.send(embed) 

  }