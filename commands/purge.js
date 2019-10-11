const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if(!message.member.roles.some(r=>["Owner", "Staff"].includes(r.name)) )
      return message.reply("You don't have permission to use this command.");

    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 1 || deleteCount > 100)
      return message.channel.send("Please provide a number between 1-100 for the number of messages to delete.");

    const fetched = await message.channel.fetchMessages({limit: deleteCount});
		message.channel.bulkDelete(fetched)
		message.channel.send(`Chat has been purged; ${deleteCount} messages deleted`)
			.catch(error => message.reply(`Couldn't delete messages because of this error: ${error}`));
 
}