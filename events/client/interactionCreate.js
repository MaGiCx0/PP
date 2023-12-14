const humanizeDuration = require("humanize-duration");
const { Collection, Permissions, MessageActionRow, MessageButton, WebhookClient } = require('discord.js');

module.exports = { 
  name: 'interactionCreate',

  async execute(interaction , client) 
    {
    if (!interaction.isCommand()) return;
    if (!client.slash.has(interaction.commandName)) return;
    if (interaction.channel.type == "DM") return interaction.reply({ content: `**:x: You can use the bot with Slash commands in the servers only!**`, ephemeral: true })
    const supp = new MessageButton()
    .setLabel(`Support Server`)
    .setStyle('LINK')
  .setURL(`https://discord.gg/DNqzGrEYTn`)

    const roww = new MessageActionRow()
    .addComponents(supp)
     try {
       if(!client.BotPermissions.has(interaction.commandName)) {
    client.BotPermissions.set(interaction.commandName, new Collection());
}
const BotPermission = client.slash.get(interaction.commandName).BotPermission.toString();
if (!interaction.guild.me.permissions.has(BotPermission)) {
return interaction.reply(`**🙄 I don't have \`${BotPermission}\` Permission**`)

}
         if(interaction.commandName != "ping") {
          await interaction.deferReply()
  }
let command = client.slash.get(interaction.commandName);
        if (!command) {
          return
        }
        if(interaction.commandName != "ping") {
        if (!client.cooldowns.has(command.name)) {
            client.cooldowns.set(command.name, new Collection());
        }
        const now = Date.now();
        const timestamps = client.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;
        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return interaction.editReply({ content : `**🏓 ${interaction.user.username}**, Cooldown \`(${humanizeDuration(Math.round(timeLeft) + "000")} left)\`` ,  ephemeral: true })
            }
        }
        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
        }

//-------------------------------------

if (!client.UserPermissions.has(command.name)) {
    client.UserPermissions.set(command.name, new Collection());
}
const UserPermission = command.UserPermission.toString();
if (!interaction.member.permissions.has(UserPermission)) {
return interaction.editReply(`**🙄 You don't have \`${UserPermission}\` Permission**`)

}
      await client.slash.get(interaction.commandName).execute(client, interaction);
    } catch (error) {
        const sup = new MessageButton()
        .setLabel(`Support Server`)
        .setStyle('LINK')
        .setURL(`https://discord.gg/DNqzGrEYTn`)

    //const row = new MessageActionRow()
              //  .addComponents(sup)
    /*let chlog = new WebhookClient({ id: "1121473097346859169", token: "6h9J1XYUei9SE-PW9KI40Y3nOyUZxrJa4-UQ2o-MVrkPGZvBr1kQnjFd93xyprS3fhvD" })
    chlog.send({ content: `${error.message}\n**Command Name: /${interaction.commandName}**` })*/
              //  return interaction.followUp({ content : `**Done Successfully!**`, components: [row] })
     //   return interaction.editReply({ content: language.wrong.reply, ephemeral: true  , components : [row] , files : [] , attachments : [] , embeds : []});
    }
}
}