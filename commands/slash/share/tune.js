const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Database } = require("quickmongo")
const db = new Database(process.env.share_db)
const embeddb = new Database(process.env.primecmds_db)
const primedb = new Database(process.env.prime_db)

module.exports = {
name: 'tune',
description: '🔧 ▸ Tune your Pusher Bot',
options: [{
  name: 'channel',
  type: 1,
  description: '🔧 ▸ Tune your Channel.',
  options: [{
      name: 'channel',
      type: 7,
      description: '[Mention||Name||ID].',
      required: true,
  }]
}, {
    name: 'bio',
    type: 1,
  description: '🔧 ▸ Tune your bio.',
  options: [{
      name: 'bio',
      type: 3,
      description: 'Type anything without links.',
      required: true,
  }]
}, {
  name: 'embed',
  type: 1,
  description: '🔧 ▸ Tune your Embed.',
  options: [{
              name: 'set',
              description: '🔧 ▸ Set Embed on or off.',
              type: 3,
              required: true,
    choices : [{
         name : "ON",
         value : "on"
     }, {
         name : "OFF",
         value : "off"
     }]
      },{
       name: 'banner',
    description: '🔧 ▸ Put Banner.',
     type: 11,
     required: false
            }, {
    name: 'color',
    description : '🔧 ▸ Set hex code color.',
    type : 3,
    required : false
  }, {
    name: 'field',
    description: '🔧 ▸ Add Fields.',
    type: 3,
    required: false,
    choices : [{
           name : "Created_At",
           value : "created_at"
       }, {
           name : "Boosts",
           value : "boosts"
       }, {
           name : "Members",
           value : "members"
       }]
  }]
}],
  cooldown: 5,
  UserPermission : ["MANAGE_MESSAGES"],
  BotPermission: ["SEND_MESSAGES"],
  async execute(client, interaction) {
    let Sub = interaction.options.getSubcommand()

  if(Sub === `channel`){
  let theC = interaction.options.getChannel('channel')
  if(!theC){
    theC = "Not Found"
  }

    if(theC.type !== "GUILD_TEXT"){
      if(theC.type === "GUILD_VOICE"){
        return interaction.editReply(`**🗂️ Error**`)
      }

        if(theC.type === "GUILD_CATEGORY"){
        return interaction.editReply(`**🗂️ Error**`)
      }

    }else
          if(1 == 1){

      await interaction.editReply({ content : `**✅ Channel has been changed to <#${theC.id}> successfully**`})
      return db.set(`sharechannel_${interaction.guild.id}`, theC.id)
          }
  }

    else if(Sub === `bio`){
      let links = new RegExp('^(https?:\\/\\/)?'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i');

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
      '@everyone',
      '@here',
      '@',
      '@&'
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

        let Desc = interaction.options.getString('bio')
        if(10 >= Desc.length){
           return interaction.editReply(`**⁉️ Description is too short**`)
        }
        else
        if(Desc.length >= 420){
           return interaction.editReply(`**⁉️ Description is too long**`)
        }
        else 
        if(420 > Desc.length) {
            if (mentions.some((mentions) =>  new RegExp(mentions, "i").test(Desc))){
        return interaction.editReply(`**⁉️ You can't put a mentions in description**`)
        }else

        if (!!links.test(Desc , 'i')){
        return interaction.editReply(`**⁉️ You can't put a links in description**`)
        }

        else
        if (links2.some((links2) =>  new RegExp(links2, "i").test(Desc))){
        return interaction.editReply(`**⁉️ You can't put a links in description**`)
        }
        else
        if (bw.some((bw) =>  new RegExp(bw, "i").test(Desc))){
        const match = bw.find((w) => RegExp(w, 'i').test(Desc))

        if (match) {

              return interaction.editReply(`**⁉️ You can't put this word \`${match}\` in description**`)
           }
        }

        else {
            await interaction.editReply(`**✅ Description has been changed successfully**`)
            return db.set(`sharedesc_${interaction.guild.id}`, Desc)
        }
        } 

  }
//embed test
    else if(Sub === `embed`){
    let g = await primedb.get(`primeguilds_${interaction.guild.id}`)
    if(g !== true){
        return interaction.editReply(`**:rolling_eyes: This feature is for Prime subscriptions only, you can buy it and benefit from it with the best features.**`)
    }else
    if(g === true){
      let set = interaction.options.getString('set')
      let bann = interaction.options.getAttachment("banner")
      let clr = interaction.options.getString('color')
      let field = interaction.options.getString('field')
if(bann){
    let Banner = interaction.options.getAttachment("banner")
    await embeddb.set(`banner_${interaction.guild.id}`, Banner.url)
    return interaction.editReply(`**✅ The embed banner has been changed successfully.**`) 
}
      else if(clr){
          let Code = "#" + interaction.options.getString('color').replaceAll('#', '');
        let color = Code;
        if (!(Code.length < 8 && /^#[0-9A-F]{6}$/i.test(Code))) {
        return interaction.editReply(`**:x: Type a vaild hex code color.**`)
        }
          await embeddb.set(`color_${interaction.guild.id}`, Code)
          return interaction.editReply(`**✅ The embed color has been changed successfully.**`) 
      }
       else if(field){
           let type = interaction.options.getString('field')
           if(type == "created_at") {
             let typedb = await db.fetch(`createdatfield_${interaction.guild.id}`)
             if(typedb == true) {
               db.delete(`createdatfield_${interaction.guild.id}`)
               return interaction.editReply({ content: `**🙁 The Created-At field has been removed from the embed.**`})
             } else if(typedb !== true) {
               db.set(`createdatfield_${interaction.guild.id}`, true)
               return interaction.editReply({ content: `**✅ The Created-At field has been added to the embed.**`})
             }
           } else if(type == "boosts") {
             let typedb = await db.fetch(`boostsfield_${interaction.guild.id}`)
             if(typedb == true) {
               db.delete(`boostsfield_${interaction.guild.id}`)
               return interaction.editReply({ content: `**🙁 The Boosts Count field has been removed from the embed.**`})
             } else if(typedb !== true) {
               db.set(`boostsfield_${interaction.guild.id}`, true)
               return interaction.editReply({ content: `**✅ The Boosts Count field has been added to the embed.**`})
             }
           } else if(type == "members") {
             let typedb = await db.fetch(`membersfield_${interaction.guild.id}`)
             if(typedb == true) {
               db.delete(`membersfield_${interaction.guild.id}`)
               return interaction.editReply({ content: `**🙁 The Members Count field has been removed from the embed.**`})
             } else if(typedb !== true) {
               db.set(`membersfield_${interaction.guild.id}`, true)
               return interaction.editReply({ content: `**✅ The Members Count field has been added to the embed.**`})
             }
           }
         
       }
    }
    }
  }
}