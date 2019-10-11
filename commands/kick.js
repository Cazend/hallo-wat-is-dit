const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if(!message.member.roles.some(r=>["Owner", "Staff"].includes(r.name)) )
        return message.reply("You don't have permissions to use this command!");
    if (message.mentions.members.size === 0)
        return message.channel.send("Please mention a user to kick");
    if (!message.guild.me.hasPermission("KICK_MEMBERS"))
        return message.channel.send("Mentioned user cannot be kicked");

    var kickReason = args.slice(1).join(" ")
    var kickMember = message.mentions.members.first()

    if (!kickReason)
        return message.channel.send("Please specify a reason!");

  kickMember.kick(kickReason)
    let embed = new Discord.RichEmbed()
      .setColor(0xFF0000)
      .setDescription(kickMember.displayName + ` has been kicked by ${message.author} reason: ${kickReason}`);
    message.channel.send({embed});
    message.delete();

}