const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
  name: 'ping',
  description: `📶 ▸ Show Pusher Bot Ping.`,
  cooldown: 3,
  UserPermission: ["SEND_MESSAGES"],
  BotPermission: ["EMBED_LINKS"],
  async execute(client, interaction) {

//  const msg = client.ws.ping;

    const embed = new MessageEmbed()
/*			embed.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})*/
/*let pinging = Date.now() - interaction.createdTimestamp
    if(pinging >= 0) {
      embed.setColor("#00FF00")
      if(pinging >= 150) {
      embed.setColor("#FFFF00")
        if(pinging >= 250) {
      embed.setColor("#FF0000")
    }
    } 
    } 
        embed.setTimestamp()
/*			embed.setDescription(
        `**Time:** ${Date.now() - interaction.createdTimestamp} ms\n**API Ping:** ${
          client.ws.ping
        } ms`,*/
      embed.setTitle('<a:p_d:1177410626461646939>   Pusher Bot Ping')
        .setImage('https://media.discordapp.net/attachments/1177362252161101914/1180731189821182022/Push-link_copy.png')
        .setThumbnail('https://media.discordapp.net/attachments/1177362252161101914/1180727735425974292/logo.png')
          .setColor('#9c2a2a')
          .addField("Time", `${Date.now() - interaction.createdTimestamp}ms`, true)
          .addField("API Ping", `${client.ws.ping}ms`, true);
 //    .setFooter({ text: `Pusher Bot`, iconURL: `${client.user.displayAvatarURL()}` });

    return interaction.reply({ embeds: [embed]});
  }
};