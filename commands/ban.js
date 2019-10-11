const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if(!message.member.roles.some(r=>["Owner", "Staff"].includes(r.name)) )
        return message.reply("You don't have permission to use this command!");
    if (message.mentions.members.size === 0)
        return message.channel.send("Please mention a user to ban");
    if (banMember.hasPermission(['BAN_MEMBERS'])) 
        return message.channel.send("Mentioned user cannot be banned");

    var banReason = args.slice(1).join(" ")
    var banMember = message.mentions.members.first()

    if (!banReason)
        return message.channel.send("Please specify a reason!");

  banMember.ban(banReason)
    let embed = new Discord.RichEmbed()
      .setColor(0xFF0000)
      .setDescription(banMember.displayName + ` has been banned by ${message.author} reason: ${banReason}`);
    message.channel.send({embed});
    message.delete();

}