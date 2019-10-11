const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if(!message.member.roles.some(r=>["Owner", "Staff"].includes(r.name)) )
        message.reply("You don't have permissions to use this command!")
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) 
        return message.channel.send("Please mention a user to mute");
    if(tomute.hasPermission("MANAGE_MESSAGES")) 
        return message.channel.send("Mentioned user cannot be muted.");

    let muterole = message.guild.roles.find(muterole => muterole.name === "muted");
    if(tomute.roles.has(muterole.id))
        return message.channel.send("Mentioned user is already muted.")

    await(tomute.addRole(muterole.id));
    let embed = new Discord.RichEmbed()
        .setColor(0xFF0000)
        .setDescription(`${tomute} has been muted by ${message.author}`);
    message.channel.send({embed});
}
