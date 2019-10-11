const Discord = require("discord.js");

exports.run = (client, message, args) => {
    if(!message.member.roles.some(r=>["Owner", "Staff"].includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");

    let sayMessage = args.join(" ");
    let servIcon = message.guild.iconURL;

    if(!sayMessage)
        return message.channel.send("Please add some text to announce");
    
    let esayEmbed = new Discord.RichEmbed()
        .setThumbnail(message.guild.iconURL)
        .setTitle("**ANNOUNCEMENT**")
        .setColor(0x00AE86)
        .setThumbnail(servIcon)
        .addField(`${sayMessage}`, `Blackouts`)
        .setTimestamp();
    
    message.delete().catch(O_o=>{});
    message.channel.send(esayEmbed); 
    
    }