const { Client, MessageEmbed, Collection , Intents , Permissions , MessageActionRow , MessageButton, WebhookClient, MessageAttachment } = require('discord.js');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ]
});

client.on("interactionCreate", async button => {
        const reportbutton = new MessageButton()
        .setLabel(`Reported By: ${button.user.username}`)
        .setStyle('DANGER')
        .setCustomId(`reported`)
        .setDisabled(true)
   const inv = new MessageButton()
  .setLabel(`Invite Pusher`)
  .setStyle('LINK')
  .setURL(client.generateInvite({ scopes: ['bot' , 'applications.commands'], permissions: [Permissions.FLAGS.ADMINISTRATOR] }))

  const row = new MessageActionRow()
  .addComponents(inv)
  .addComponents(reportbutton)
  if(!button.isButton()) {
    return
  } else {
    if(button.customId == 'report') {
      if(button.message.embeds[0]) {
await client.channels.cache.get("1181561939743223808").send(`
\n**New report from:
\n<@${button.user.id}>
\n${button.user.id}

_ _ _ _ _ _ _ _ _ _ Report Information:\n\`${button.message.embeds[0]?.footer.text}\`\nServer Description:\n${button.message.embeds[0]?.description}\n\nServer Banner: ${button.message.embeds[0]?.image.url}\nServer Prime Status: Active 🟢\nServer URL: ${button.message.content} **`)
        button.deferUpdate()
      return button.message.edit({ components: [row] })
      }
if(!button.message.embeds[0]) {
await client.channels.cache.get("1181561939743223808").send(` \n**New report from: \n\`User:\` <@${button.user.id}>\n\`User ID:\` ${button.user.id} 
_ _ _ _ _ _ _ _ _ _ Report Information:\n${button.message.content} **`)
        button.deferUpdate()
      return button.message.edit({ components: [row] })
      }
    }
  }
})