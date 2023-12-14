const { MessageEmbed , MessageButton , MessageActionRow , Permissions} = require("discord.js")
const ms = require("humanize-duration")
const millify = require("millify")
const commaNumber = require('comma-number')

module.exports = {
  name: 'bot',
  description: `🤖 Pusher Stats`,
  cooldown: 3,
  UserPermission: ["SEND_MESSAGES"],
  BotPermission: ["EMBED_LINKS"],
  async execute(client, interaction) {

    const inv = new MessageButton()
  .setLabel(`Invite Pusher`)
  .setStyle('LINK')
  .setEmoji('<:ShinyRedLink:1177385624907554817>')
  .setURL(client.generateInvite({ scopes: ['bot' , 'applications.commands'], permissions: [Permissions.FLAGS.ADMINISTRATOR] }))

    const sup = new MessageButton()
  .setLabel(`Support Server`)
  .setStyle('LINK')
  .setURL(`https://discord.gg/DNqzGrEYTn`)
  .setEmoji('<:ShinyRedStaff:1177681961922347088>')

const row = new MessageActionRow()
      .addComponents(inv)
      .addComponents(sup)

let servers = client.guilds.cache.size
let channels = client.channels.cache.size
let users = `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`

    let embed = new MessageEmbed()
    .addField(`<:NeonRedApplication:1177398380868161636> Statistics:`, `<:dark_red:1177364838939365427> **Servers:** \`${commaNumber(servers)} servers\`\n<:dark_red:1177364838939365427> **Users:** \`${commaNumber(users)} user\`\n<:dark_red:1177364838939365427> **Channels:** \`${commaNumber(channels)} channel\``, true)
    .addField(`<:NeonRedBot:1177398282813722755> Bot:`, `<:dark_red:1177364838939365427> **Created At:** <t:${Math.floor(client.user.createdTimestamp/1000.0)}:R>\n<:dark_red:1177364838939365427> **Uptime:** \`${ms(client.uptime , { round : true})}\`\n<:dark_red:1177364838939365427> **RAM Usage:** \`${(process.memoryUsage().rss / 1048576).toFixed()} MB\`\n<:dark_red:1177364838939365427> **Node Version:** \`${process.version}\`\n<:dark_red:1177364838939365427> **Ping:** \`${client.ws.ping}\``, true)
    .setThumbnail(client.user.displayAvatarURL({dynamic : true , format : "png"}))
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
    .setColor("#36393f")
    return interaction.editReply({embeds : [embed] , components : [row]})
  }
}