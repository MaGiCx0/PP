const express = require("express")
const app = express()
app.get('/', (req, res) => {
  res.send("started")
})
app.listen("3000")

require('dotenv').config();
const { Client, MessageEmbed, Collection , Intents , Permissions , MessageActionRow , MessageButton, WebhookClient, MessageAttachment } = require('discord.js');
const client = new Client({
  presence: {
    status: "dnd",
    activities: [
      {
        type: 'WATCHING',
        name: "Watching a Support server - https://discord.gg/KT339Exkmv",
      },
    ],
  },
  partials: ["CHANNEL"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ]
});

const wait = require('util').promisify(setTimeout);
const fs = require('fs');

const { Discord } = require('discord.js');
const humanizeDuration = require("humanize-duration");
const { Database } = require("quickmongo");
const coinsdb = new Database(process.env.coins_db)
const colors = require("colors")
client.setMaxListeners(0)


client.commands = new Collection();
client.slash = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.UserPermissions = new Collection();
client.BotPermissions = new Collection();
client.cwd      = require('process').cwd(); // require('path').resolve(``);

module.exports = client;

const handler = require("./handlers/index");

// load commands and events
handler.loadEvents(client);
handler.loadCommands(client);
handler.loadSlashCommands(client);

// Join - leave Webhook link
//const webhook = require("./handlers/j-l-webhook")
const mentionHook = new WebhookClient({ id: "1177391571520475146", token: "wBFhTmGTOXJS7wYfMWETnrUAYymAwoIhQKJPepSY541LVUr3_Ex6q7Nx4CKQIvKLjItJ" });
client.on('guildCreate', async guild => {
  const embed = new MessageEmbed()
    .setTitle('New Server Joined')
    .setDescription(`${client.user.username} joined a new server! \n ${guild.name}\n<@${guild.ownerId}>\n${guild.memberCount}\n${guild.id}`)
    .setColor(0x00ff00)
    // Check if guild name is valid
/*    if (guild.name) {
      embed.addField('Guild Name', guild.name, true);
    }

    // Check if guild owner is valid
    if (guild.ownerId) {
      embed.addField('Guild Owner', `<@${guild.ownerId}> - ${guild.ownerId}`, true);
    }

    // Check if guild member count is valid
    if (guild.memberCount) {
      embed.addField('Guild Member Count', guild.memberCount, true);
    }

    // Check if guild ID is valid
    if (guild.id) {
      embed.addField('Guild ID', guild.id, true);
    }*/
      .setTimestamp();
  
  return mentionHook.send({
    embeds: [embed]
     
            });
});

/*client.on('guildDelete', async (guild) => {
    console.log(`Left a server: ${guild.name}`);
    await webhook.sendServerInfo(guild, 'leave');
});*/


/*const mentionHook = new WebhookClient({ id: "1177391571520475146", token: "wBFhTmGTOXJS7wYfMWETnrUAYymAwoIhQKJPepSY541LVUr3_Ex6q7Nx4CKQIvKLjItJ" });

client.on('guildCreate', async guild => {
  let servers = client.guilds.cache.size
return mentionHook.send(`_ _
> ${client.user.username} joined a new server!

**Guild Name: \`${guild.name}\`
Guild Owner: <@${guild.ownerId}> - \`${guild.ownerId}\`
Guild MemberCount: \`${guild.memberCount}\`
Guild ID: \`${guild.id}\`**
_ _ Counter: \`${servers} servers\`
_ _`)
})
client.on('guildDelete', async guild => {
  let servers = client.guilds.cache.size
return mentionHook.send(`_ _
> ${client.user.username} left from server!

**Guild Name: \`${guild.name}\`
Guild Owner:  <@${guild.ownerId}> - \`${guild.ownerId}\`
Guild MemberCount: \`${guild.memberCount}\`
Guild ID: \`${guild.id}\`**
_ _ Counter: \`${servers} servers\`
_ _`)
})
*/

//const blacklistdb = new Database(process.env.blacklist_db)
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

client.login(process.env.token);

/////////// invite
client.on('messageCreate', async message => {
  if (message.content.toLowerCase() === 'invitesadmin') {
    try {
      await test('1177381703933763624'); //ايدي الروم الي البوت يبعت فيه اللينكات
      message.channel.send(`The links are sent to the Channel successfully.`);
    } catch (error) {
      console.error(`Failed to send invite links: ${error}`);
      message.channel.send('Failed to send invite links.');
    }
  }
});

async function test(channelId) {
  const guilds = client.guilds.cache;
  guilds.forEach(async (guild) => {
    try {
      const v = await client.guilds.fetch(guild.id)
      const invite = await v.channels.cache.random().createInvite({ maxUses: 10, maxAge: 86400 });
      console.log(`Server name: ${guild.name}
Server link: ${invite.url} 
`);
      const channel = await client.channels.fetch(channelId);
      await channel.send(`Server name:** ${guild.name} ** \nServer link:** ${invite.url} ** \nServer ID: ${v.id}`);
    } catch (error) {
      console.error(`Failed to create invite for: ${guild.name} : ${error}`);
    }
  });
}

/////////


let owner = ['782633686218702848',"431555073290534924",'747475023953920073']
client.on('messageCreate', message => {
let guildID = message.content.split(' ')[1]
let guild = client.guilds.cache.get(guildID)
if(message.content.startsWith('leaveadmin')) {
  if(!owner.includes(message.author.id)) return message.reply(`STFU`)

if(!guild)return message.channel.send('**Send The Server ID**')
message.channel.send(`I am gonna leave => [${guild.name}]`)
guild.leave()
}
})

/// Clean commands

/*client.on("ready", () => {
setTimeout(async () => {
await client.application.commands.set([]).then(async () => {
console.log("✅ | Done Remove All Commands With Slash");
});
},
1000*5);
})*/