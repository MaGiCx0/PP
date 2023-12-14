const { MessageEmbed , MessageButton , MessageActionRow , Permissions } = require("discord.js")

module.exports = {
  name: 'pusher',
  description: `💎 ▸ Pusher General bot commands.`,
  options: [{
    name: 'help',
    type: 1,
    description: '❓ ▸ all Pusher Commands Help.',
  }, {
    name: 'ping',
    type: 1,
    description: '📶 ▸ Show Pusher Bot Ping.',
  }],
  cooldown: 3,
  UserPermission: ["SEND_MESSAGES"],
  BotPermission: ["EMBED_LINKS"],
  async execute(client, interaction) {
    if (interaction.options.getSubcommand() === "help") {
           const embeds = [
      new MessageEmbed()
              .setColor('#9c2a2a')
              .setTitle( '<:P_Owner:1177386235489177640> **Hello i’m Pusher bot,**', '#bd442d')
            .setDescription('I can help you to Push your server up and grow it with members.\n\n<a:dot_p:1177410972512694322> **What Can Pusher Bot actually do?**\nI can push (Share) your server to other servers like i push the other servers in your server.\n\n<a:dot_p:1177410972512694322> **How can i use the bot?**\nJust add it and set your push channel then set your server description and just **Push it up**.\n\n<:P_Link:1177364780751786085> **Add Pusher Bot Now** [[Click Here](https://discord.com/api/oauth2/authorize?client_id=857134902692806656&permissions=8&scope=bot)]\n<:P_Staff:1177386381861998732> **Support server** [[Click Here](https://discord.gg/BcRAYj9rgD)]\n')
              //.setUrl('https://example.com')
      //        .setTimestamp(new Date())
      //        .setAuthor('Pusher Bot')
      //        .setFooter('Push Your Server Now')
          //.setEmoji('<:dark_red:1177364838939365427>')
              .setImage('https://media.discordapp.net/attachments/1177362252161101914/1180731189821182022/Push-link_copy.png')
              .setThumbnail('https://media.discordapp.net/attachments/1177362252161101914/1180727735425974292/logo.png')
          //.addField('<:P_slash:1178444644267331656> **</help:1176278633866870795> **','**➲** Get all Bot help') 
              ,

      new MessageEmbed()
                  .setColor('#9c2a2a')
                  .setTitle( 'Commands', '#bd442d')
              //       .setDescription('وصف embed', '#00FF00')
                  //.setUrl('https://example.com')
      //            .setTimestamp(new Date())
                  .setAuthor('Pusher Bot')
      //            .setFooter('Push it Now')
              //.setEmoji('<a:discord_clyde_gif:1177410626461646939>')
              .setImage('https://media.discordapp.net/attachments/1177362252161101914/1180731189821182022/Push-link_copy.png')
              .setThumbnail('https://media.discordapp.net/attachments/1177362252161101914/1180727735425974292/logo.png')
              .addField('<:P_slash:1178444644267331656> **/channel**','**➲** Get all bot help'),

      new MessageEmbed()
                  .setColor('#9c2a2a')
                  .setTitle( 'Commands', '#bd442d')
              //       .setDescription('وصف embed', '#00FF00')
                  //.setUrl('https://example.com')
      //            .setTimestamp(new Date())
                  .setAuthor('Pusher Bot')
      //            .setFooter('Push it Now')
              //.setEmoji('<a:discord_clyde_gif:1177410626461646939>')
              .setImage('https://media.discordapp.net/attachments/1177362252161101914/1180731189821182022/Push-link_copy.png')
              .setThumbnail('https://media.discordapp.net/attachments/1177362252161101914/1180727735425974292/logo.png')
              .addField('<:P_slash:1178444644267331656> **/push**','```➲ Get all bot help```')

        ];

            // Create an array of buttons for pagination
            const buttons = [
                new MessageButton()
              .setCustomId('previous')
              ////م.setLabel('Previous')
             .setEmoji("<:p_left:1178150675083968572>")

              .setStyle('SECONDARY'),

                new MessageButton()
              .setCustomId('next')
              ///.setLabel('Next')
              .setEmoji("<:p_right:1178149550284877824>")

              .setStyle('SECONDARY')
            ];

            // Create an action row with the buttons
            const actionRow = new MessageActionRow().addComponents(buttons);

            // Send the initial embed with buttons
            const messageComponent = await interaction.editReply({ embeds: [embeds[0]], components: [actionRow] });

            // Create a collector to listen for button interactions
            const collector = messageComponent.createMessageComponentCollector({ time: 60000 });

            // Set the current page index
            let currentPage = 0;

            collector.on('collect', async (interaction) => {
                // Handle button interactions
                if (interaction.isButton()) {
                    // Handle previous button
                    if (interaction.customId === 'previous') {
                        currentPage = (currentPage - 1 + embeds.length) % embeds.length;
                    }
                    // Handle next button
                    else if (interaction.customId === 'next') {
                                  currentPage = (currentPage + 1) % embeds.length;
                              }

                              // Update the embed and buttons
                              await interaction.update({ embeds: [embeds[currentPage]], components: [actionRow] });
                          }
                      });

                      collector.on('end', () => {
                          // Remove the buttons after the collector ends
                          messageComponent.edit({ components: [] });
                      });
    }
    if (interaction.options.getSubcommand() === "ping") {
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
  }
}
