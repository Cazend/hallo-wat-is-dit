const Discord = require('discord.js');

exports.run = (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let totalSeconds = (bot.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    let embed = new Discord.RichEmbed()
        .setThumbnail(bicon)
        .setColor(0xFF0000)
        .setTitle("**UPTIME**")
        .addField("**Uptime**", `Uptime of bot is ${uptime}`)
        .setTimestamp();

    message.channel.send(embed);

}
