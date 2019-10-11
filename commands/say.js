exports.run = (client, message, args) => {
    const Discord = require("discord.js");
        if(!message.member.roles.some(r=>["Owner", "Staff", "Donator"].includes(r.name)) )
          return message.reply("You don't have permission to use this command."); 
        const sayMessage = args.join(" ");
        if (!sayMessage)
            return message.channel.send("Please provide a message of what I have to say.")
        message.delete().catch(O_o=>{}); 
        message.channel.send(sayMessage);
    }