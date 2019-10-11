const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if(!message.member.roles.some(r=>["Owner", "Staff"].includes(r.name)) )
        message.reply("You don't have permissions to use this command!")

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if(!tomute) 
        return message.channel.send("Please mention a user who is currently muted");

    if(tomute.hasPermission("MANAGE_ROLES")) 
        return message.reply("User cannot be unmuted");

    let muterole = message.guild.roles.find(role => role.name === "muted")

    if(!tomute.roles.has(muterole.id))
        return message.channel.send("Mentioned user isn't muted")

    tomute.removeRole(muterole.id);
    let embed = new Discord.RichEmbed()
        .setColor(0xFF0000)
        .setDescription(`${tomute} has been unmuted`);
    message.channel.send({embed});
}
