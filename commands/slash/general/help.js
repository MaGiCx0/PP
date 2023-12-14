const { MessageEmbed , MessageButton , MessageActionRow , Permissions } = require("discord.js")

module.exports = {
  name: 'help',
  description: `❓ ▸ all Pusher Commands Help.`,
  cooldown: 3,
  UserPermission: ["SEND_MESSAGES"],
  BotPermission: ["EMBED_LINKS"],
  async execute(client, interaction) {

      // Create an array of embeds for pagination
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

  }}
    /*    
    let prefix;
    prefix = "/"
  const inv = new MessageButton()
  .setLabel(`Invite Pusher`)
  .setStyle('LINK')
.setEmoji('<:ShinyRedLink:1177385624907554817>')
  .setURL(client.generateInvite({ scopes: ['bot' , 'applications.commands'], permissions: [Permissions.FLAGS.ADMINISTRATOR] }))

    const sup = new MessageButton()
  .setLabel(`Support Server`)
  .setStyle('LINK')
 .setEmoji('<:ShinyRedStaff:1177681961922347088>')
  .setURL(`https://discord.gg/DNqzGrEYTn`)

const row = new MessageActionRow()
      .addComponents(inv)
      .addComponents(sup)

        let embed1 = new MessageEmbed()
          .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        //// insteraction 
          .setThumbnail(client.user.avatarURL({ dynamic:true }))
        .addField(`🗂️ General:`, `>>> **</help:1176278633866870795>,</ping:1176278633866870794>,</bot:1176278633866870796>,</user:1176278634219176060>**`)
        .addField(`🔮 Bumping:`,`>>> **</channel:1176278633866870797>,</desc:1176278633866870798>,</push:1176278633866870799>,</preview:1176278633866870800>**`)
        .addField(`<a:emoji_22:1124362661371596882> Coins:`,`>>> **</coins:1176278633866870801>,</daily:1176278633866870803>,</leaderboard:1176278633866870802>**`)
        .addField(`:gem: Prime:`, `>>> **</prime preview:1176278634219176058>,</prime move:1176278634219176058>,</prime subscribe:1176278634219176058>,</embed banner:1176278634219176061>**`)
        .setColor("#36393f")
       return interaction.editReply({embeds : [embed1] , components : [row]})
    }*/