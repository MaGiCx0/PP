const { MessageAttachment , MessageButton , MessageActionRow, MessageEmbed , Permissions } = require('discord.js');
const humanizeDuration = require("humanize-duration");
const { Database } = require("quickmongo");
let devs = ['455708285593583616',"431555073290534924"]
const db = new Database(process.env.share_db)
const primedb = new Database(process.env.prime_db)
const bannerdb = new Database(process.env.primecmds_db)
const coinsdb = new Database(process.env.coins_db)
const time = require("../../../time.js")
const Embed = require('../../styles/embed.js');
const embed = new Embed('https://media.discordapp.net/attachments/1177381703933763624/1181549013875560478/1177364736459944066.png');
embed.setImage('https://media.discordapp.net/attachments/1177381703933763624/1181532493933981777/Push-link.png');


module.exports = {
  name: 'push',
  description: `📢 ▸ Push it Now.`,
  cooldown: 10,
  UserPermission : ["MANAGE_MESSAGES"],
  BotPermission: ["EMBED_LINKS"],
  async execute(client, interaction) {
/*
if(!devs.includes(interaction.user.id)) return interaction.editReply(`The command has been disabled for a short time. please wait!`)*/
      let links = new RegExp('^(https?:\\/\\/)?'+
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
      '(\\?[;&a-z\\d%_.~+=-]*)?'+
      '(\\#[-a-z\\d_]*)?$','i');


  //-----

   let links2 = [
   'https://',
  'http://',
  'discord.gg',
  '.gg',
  '.xyz',
  '.club',
  ]

  //-----

  let mentions = [
  '@'
  ]

  //--------

  let bw = [

  'مطلوب',
  'روبلوكس',
  'كس',
  'طيز',
  'بيع',
  'للبيع',
  'احا',
  'طلب',
  'شوب',
  'متناك',
  'عرص',
  'خول',
  'منيوك',
  'منيك',
  'منيوق',
  "نيك",
  "تيزك",

  //-------
  "كس" , "ك س" , "كث" , "ك ث" , "كص" , " ك ص" , "قسمك" , "صمق" , "صمك" , "كسمك" , "ك س م ك" , "متناك" , "متناق" , "منيوك" , "لبوه" , "وسخ" , "وصخ" , "وسخه" ,  "وصخه" ,  "نيق" , "منيكه" , "منيقه" , "شرموط" , "شرموت" , "شرمت" , "شرمط" , "شرمطه" , "شرمته" , "منكوح" , "نكح" , "طيز" , "مؤخره" , "مكواه" , "سكس" , "سيكس" , "سيكسي" , "بزاز" ,"بظاظ" ,"بذاذ sex" , "sexy" , "s e x" , "as" , "ass" , "gay" , "lesbian" , "deck" , "shit" , "Sex" , "pussy" , "gays" , "Pussy" , "kos" , "kiss" , "Kiss" , "NSFW" , "18+" , "18" , "nsfw" , "Nsfw" , "Sexy" , "s e x y" ,  "sfw" , "Sfw" , "SFW"
  ]
      let coinss = await coinsdb.fetch(`coins_${interaction.user.id}`)
      let channel = await db.fetch(`sharechannel_${interaction.guild.id}`)
      if(channel === null) channel = "Not Selected"
      let desc = await db.fetch(`sharedesc_${interaction.guild.id}`)
      if(desc === null) desc = "Not Selected"
      let cooldown = await db.fetch(`sharecooldown_${interaction.guild.id}`)
      if(cooldown === null) cooldown = 0
      if(channel == "Not Selected") {
        embed.setDescription(`**⁉ Select the share channel ..\n/tune channel ..**`)
        return interaction.editReply({embeds : [embed.toP()]})
      }
      if(desc == "Not Selected") {
        return interaction.editReply(`**⁉️ Select the description**`)
      }
      let c = channel;
    let perms = interaction.guild.me.permissionsIn(c).toArray() || interaction.guild.me.permissions.toArray()
      let evP = interaction.guild.roles.everyone.permissionsIn(c).toArray()
      const pSubscription = await primedb.get(`primeguilds_${interaction.guild.id}`)
    if(!perms.includes("CREATE_INSTANT_INVITE"))return interaction.editReply(`**⁉️ I need \`Create Invite\` Permission**`)
    if(pSubscription !== true && !evP.includes("VIEW_CHANNEL") && !perms.includes("MANAGE_CHANNELS")){
        return interaction.editReply(`**🙄 Don't edit the permissions of the bumping channel.**`)
      }
      if(pSubscription !== true && !evP.includes("VIEW_CHANNEL") && perms.includes("MANAGE_CHANNELS")){
        client.channels.cache.get(c).permissionOverwrites.edit(interaction.guild.id, {VIEW_CHANNEL : true , SEND_MESSAGES: false })
        return interaction.editReply(`**🙄 Don't edit the permissions of the bumping channel.**`)
      }
      if(pSubscription !== true && !perms.includes("SEND_MESSAGES") && perms.includes("MANAGE_CHANNELS")){
        client.channels.cache.get(c).permissionOverwrites.edit(client.user.id, {VIEW_CHANNEL : true , SEND_MESSAGES: true })
        return interaction.editReply(`**🙄 Don't edit the permissions of the sharing channel.**`)
      }
      if(c.type !== "GUILD_TEXT"){
        if(c.type === "GUILD_VOICE"){
          return interaction.editReply(`**🗂️ Error**`)
        }

          if(c.type === "GUILD_CATEGORY"){
          return interaction.editReply(`**🗂️ Error**`)
        }
      }
         let cooldwon = cooldown;
        let times = (cooldwon - Date.now());
        if (cooldwon > Date.now()){	  
          embed.setDescription(`\`\`\`🙄 You can share again after: ${humanizeDuration(times , {round : true})}\`\`\` `)
          return interaction.editReply({embeds : [embed.toP()]})
        }else 
          if (mentions.some((mentions) =>  new RegExp(mentions, "i").test(interaction.guild.name))){
            return interaction.editReply(`**⁉️ You can't mentions in server name**`)
          }else
            if (!!links.test(interaction.guild.name , 'i')){
              return interaction.editReply(`**⁉️ You can't put links in server name**`)
            }
            else
            if (bw.some((bw) =>  new RegExp(bw, "i").test(interaction.guild.name))){
              let match = bw.find((w) => RegExp(w, 'i').test(interaction.guild.name))
                  return interaction.editReply(`**⁉️ You can't this word \`${match}\` in server name**`)
            }else{
                var invite = null
      if(interaction.guild.vanityURLCode !== null) {
        invite = `https://discord.gg/${interaction.guild.vanityURLCode}`
      } else {
        invite = `${await interaction.channel.createInvite({ maxAge : 0 , maxUses : 0})}`
      }
                if(pSubscription === true){
            db.set(`sharecooldown_${interaction.guild.id}`, `${parseInt(Date.now() + time.PrimeST)}`)
                  await interaction.editReply({ content : `**:gem: Your server has been shared to \`${client.guilds.cache.size}\` server**` , files : [] , attachments: [] })


           const join = new MessageButton()
  .setLabel(`Join`)
  .setStyle('LINK')
  .setURL(`${invite}`)


                  const inv = new MessageButton()
  .setLabel(`Invite Pusher`)
  .setStyle('LINK')
  .setEmoji('<:ShinyRedLink:1177385624907554817>')
  .setURL(client.generateInvite({ scopes: ['bot' , 'applications.commands'], permissions: [Permissions.FLAGS.ADMINISTRATOR] }))
        const reportbutton = new MessageButton()
        .setLabel(`Report`)
        .setStyle('DANGER')
        .setCustomId(`report`)
  const row = new MessageActionRow()
      .addComponents(inv)
        .addComponents(reportbutton)
            client.guilds.cache.forEach(async (g) => {
              let rooms = await db.fetch(`sharechannel_${g.id}`)
              let ptest = await primedb.get(`primeguilds_${g.id}`)
              /*if(ptest === true) {
                return
              }else
              if(ptest !== true) {*/
              let room = g.channels.cache.get(rooms);
              if (!room) return
              let Banner = await bannerdb.get(`banner_${interaction.guild.id}`)
              if(Banner == null){Banner = `https://media.discordapp.net/attachments/1177644829740642474/1180799130835091486/Push-link_copy.png`}
                let code = await bannerdb.get(`color_${interaction.guild.id}`)
          if(code == null) code = "#9c2a2a"
              let msgg = desc
              let finaldesc = msgg
              .replace("%mc%", interaction.guild.memberCount)
              .replace("%boosts%", interaction.guild.premiumSubscriptionCount)
                .replace("%n%", `\n`)
              let embed = new MessageEmbed().setDescription(`**🔍 Server: ${interaction.guild.name}\n\n\n**📫 **Desciption: ${finaldesc}**`).setImage(Banner).setFooter({ text: `Server ID: ${interaction.guild.id}`, iconURL: interaction.guild.iconURL({ dynamic: true }) }).setColor(`${code}`)

                  room.send({content : `${invite}`, components : [row] , embeds : [embed]})

            })


      }
                if(pSubscription !== true) {
                    if(coinss < 5) {
                        return interaction.editReply(`**:rolling_eyes: You don't have 5 coins to share your server, Collect coins or buy a prime version.**`)
                    }
                    coinsdb.subtract(`coins_${interaction.user.id}`, 5)
  db.set(`sharecooldown_${interaction.guild.id}`, `${parseInt(Date.now() + time.ShareTime)}`)
                  await interaction.editReply({ content : `**✨ Your server has been shared to \`${client.guilds.cache.size}\` server**` , files : [] , attachments: [] })

      client.guilds.cache.forEach(async (g) => {
        let rooms = await db.fetch(`sharechannel_${g.id}`)
        let ptest = await primedb.get(`primeguilds_${g.id}`)
             /* if(ptest === true) {
                return
              }else
              if(ptest !== true) {
        if(rooms == null) {
          return
        }*/
        const join = new MessageButton()
  .setLabel(`Join`)
  .setStyle('LINK')
  .setURL(`${invite}`)

          const inv = new MessageButton()
  .setLabel(`Invite Pusher`)
  .setStyle('LINK')
  .setEmoji('<:ShinyRedLink:1177385624907554817>')
  .setURL(client.generateInvite({ scopes: ['bot' , 'applications.commands'], permissions: [Permissions.FLAGS.ADMINISTRATOR] }))
        const reportbutton = new MessageButton()
        .setLabel(`Report`)
        .setStyle('DANGER')
        .setCustomId(`report`)
  const row = new MessageActionRow()
      .addComponents(join)
      .addComponents(inv)
        .addComponents(reportbutton)
        let room = g.channels.cache.get(rooms);
              if(!room) {
                return db.delete(`sharechannel_${g.id}`)
              }
              let msgg = desc
              let finaldesc = msgg
              .replace("%boosts%", interaction.guild.premiumSubscriptionCount)
                .replace("%n%", `\n`)
        let embedf = new MessageEmbed().setDescription(`**🔍 Server: ${interaction.guild.name}\n\n\n**📫 **Desciption: ${finaldesc}**`).setImage(`https://media.discordapp.net/attachments/1177644829740642474/1180799130835091486/Push-link_copy.png`)/*.setFooter({ text: `Server ID: ${interaction.guild.id}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })*/.setColor(`#9c2a2a`)


        room.send({content : `${invite}`, components : [row] , embeds : [embedf]}).then(async () => {
})})
    }
            }
            }}