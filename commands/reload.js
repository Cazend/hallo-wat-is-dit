exports.run = (client, message, args) => {
    if(!message.member.roles.some(r=>["Owner", "Staff"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
  if(!args || args.size < 1) return message.reply("No command provided");
  const commandName = args[0];
  if(!client.commands.has(commandName)) {
    return message.reply(`No such command as ${commandName} exists`);
  }
  delete require.cache[require.resolve(`./${commandName}.js`)];
  client.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);
  message.channel.send(`Command **${commandName}** has succesfully been reloaded!`);
};