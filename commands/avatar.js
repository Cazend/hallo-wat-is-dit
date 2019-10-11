const Discord = require('discord.js');
exports.run = (client, message, args, tools) => {
  
	var member = message.mentions.users.first() || message.author;
	
	let embed = new Discord.RichEmbed() 
		.setTitle(member.tag + '\'s avatar')
		.setImage(member.avatarURL);
	
	message.channel.send({embed})
	};