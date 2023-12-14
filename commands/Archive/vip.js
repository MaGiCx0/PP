let devs = ["782633686218702848","431555073290534924","747475023953920073"];
const { Database } = require("quickmongo")
const primedb = new Database(process.env.prime_db)
const time = require("../../../time.js")
const ms = require("ms")
const { MessageEmbed, WebhookClient } = require("discord.js")
const humanizeDuration = require("humanize-duration")

module.exports = {
  name: 'vip',
  description : "🎗️ Developers Only.",
  options : [{
  name : "user",
  description : "User ID",
  type : 3,
  required : true,
  },{
  name : "action",
  description : "The Action.",
  type : 3,
  required : true,
  choices : [{
  name : "add",
  value : "add"
  }, {
  name : "remove",
  value : "remove"

  }, {
  name : "check",
  value : "check"
  }] 
  },
  {
  name : "guild",
  description : "Server ID",
  type : 3,
  required : true
  }, {
  name : "time",
  description : "Time",
  type : 3,
  required : false
  }],
  cooldown: 2,
  UserPermission: ["SEND_MESSAGES"],
    BotPermission: ["EMBED_LINKS"],
  async execute(client, interaction) {

if(!devs.includes(interaction.user.id)) return interaction.editReply(`**:x: Developers Only.**`)
//// رول البرايم
        let primeR = "1124354439734640650"
        let ac = interaction.options.getString("action")
        let iddd = interaction.options.getString("user")
        let guildd = interaction.options.getString("guild")
        let timee = interaction.options.getString("time")
        let idd = await client.users.fetch(iddd)
        if(guildd !== null){
        let guild = client.guilds.cache.get(guildd)
        if(ac == "add" && !guild)return interaction.editReply(`**:rolling_eyes: I can't find this server.**`)
        if(ac == "add" && guild){
            if(!timee){
            timee = Date.now() + time.month
            }else
                timee = Date.now() + parseInt(ms(timee))
                primedb.set(`primeuserguild_${idd.id}` , guild.id)
            primedb.set(`primetime_${idd.id}` , `${parseInt(timee)}`)
            primedb.set(`primestatus_${idd.id}` , true)
            let ppp = await primedb.get(`primeguilds_${guild.id}`)
            if(ppp !== true){
            await primedb.set(`primeguilds_${guild.id}`, true)
            let PU = await client.guilds.cache.get("1104015122684452935").members.cache.find(m => m.id == idd.id)
                if(!PU) {
                    let tttttt = (timee - Date.now())
                    let mmsg = new WebhookClient({ id: "1104371889931030599", token: "kc0z2E2jwyvF_TTHnVTz_sel0vh_3lPKYTcvIvGOXTexkR5rStiRBVAtK0C5N9vQDYd8" });
                await mmsg.send(`**Action taken by Admin: <@${interaction.user.id}>\nhas been gived a prime for: <@${idd.id}>, ${idd.id}, [${idd.tag}](https://discord.com/user/${idd.id})\nServer: ${guild.name} | ${guild.id}\nTime: ${humanizeDuration(tttttt , { round : true })}**`)
                return interaction.editReply(`**:v: Done. Prime has been __Given__ to the user**`)
                }
                if(PU){
                    let tttttt = (timee - Date.now())
                    PU.roles.add(primeR)
                   let mmsg = new WebhookClient({ id: "1104371889931030599", token: "kc0z2E2jwyvF_TTHnVTz_sel0vh_3lPKYTcvIvGOXTexkR5rStiRBVAtK0C5N9vQDYd8" });
                await mmsg.send(`**Action taken by Admin: <@${interaction.user.id}>\nhas been gived a prime for: <@${idd.id}>, ${idd.id}, [${idd.tag}](https://discord.com/user/${interaction.user.id})\nServer: ${guild.name} | ${guild.id}\nTime: ${humanizeDuration(tttttt, { round : true })}**`)
                return interaction.editReply(`**:v: Done. Prime has been __Given__ to the user**`)
                }
                        }else
            if(ppp === true)return interaction.editReply(`**:rolling_eyes: This server have a prime subscription already.**`)
        }
    }

    if(ac == "remove"){
        let ss = await primedb.fetch(`primestatus_${idd.id}`)
        if(ss !== true) {
            return interaction.editReply(`**:rolling_eyes: This user doesn't have a prime subscription.**`)
        }
      let guildddddd = await primedb.fetch(`primeuserguild_${idd.id}`)
      let ser = await primedb.fetch(`primeguilds_${guildddddd}`)
      if(ser === null) return interaction.editReply(`**:rolling_eyes: This server doesn't have a prime subscription.**`)
      if(ser === true) {
        primedb.delete(`primeguilds_${guildddddd}`)
        primedb.delete(`primetime_${idd.id}`)
        primedb.delete(`primestatus_${idd.id}`)
          primedb.delete(`primeuserguild_${idd.id}`)
        let PU = await client.guilds.cache.get("1104015122684452935").members.cache.find(m => m.id == idd.id)
            if(!PU) {
                let mmsg = new WebhookClient({ id: "1104371889931030599", token: "kc0z2E2jwyvF_TTHnVTz_sel0vh_3lPKYTcvIvGOXTexkR5rStiRBVAtK0C5N9vQDYd8" });
                await mmsg.send(`**Action taken by Admin: <@${interaction.user.id}>\nhas been removed a prime from: <@${idd.id}>, ${idd.id}, [${idd.tag}](https://discord.com/user/${idd.id}) **`)
                await interaction.editReply(`**:v: Done. Prime has been __Removed__ from the user**\nDear admin dont forget to provied a reason in prime log`)
                return idd.send(`أهلا يا **@${(await idd).username}**,\nنود أعلامك بأنه تم حذف إشتراك البرايم الخاص بك من قبل المطورين، لمعرفة السبب يُمكنك التواصل مع المطورين من خلال سيرفر الدعم الفني الخاص بنا\n\nHello **@${(await idd).username}**,\nWe would like to inform you that your Prime subscription has been deleted by the developers, to find out why you can contact the developers through our technical support server\n\n- https://discord.gg/DNqzGrEYTn`)
            }
            if(PU){
                PU.roles.remove(primeR)
                let mmsg = new WebhookClient({ id: "1104371889931030599", token: "kc0z2E2jwyvF_TTHnVTz_sel0vh_3lPKYTcvIvGOXTexkR5rStiRBVAtK0C5N9vQDYd8" });
                await mmsg.send(`**Action taken by Admin: <@${interaction.user.id}>\nhas been removed a prime from: <@${idd.id}>, ${idd.id}, [${idd.tag}](https://discord.com/user/${idd.id}) **`)
                await interaction.editReply(`**:v: Done. Prime has been __Removed__ from the user**\nDear admin dont forget to provied a reason in prime log`)
                return idd.send(`أهلا يا **@${(await idd).username}**,\nنود أعلامك بأنه تم حذف إشتراك البرايم الخاص بك من قبل المطورين، لمعرفة السبب يُمكنك التواصل مع المطورين من خلال سيرفر الدعم الفني الخاص بنا\n\nHello **@${(await idd).username}**,\nWe would like to inform you that your Prime subscription has been deleted by the developers, to find out why you can contact the developers through our technical support server\n\n- https://discord.gg/DNqzGrEYTn`)
            }
      }
    }

    if(ac == "check"){

        let dd = await primedb.get(`primestatus_${idd.id}`)
        if(dd == null){
            let embed = new MessageEmbed()
            .setDescription(`**This user doesn't have a prime subscription.**`)
            .setColor("#ff0000")
            return interaction.editReply({embeds : [embed]})
        }
        if(dd == true){
            let pt = await primedb.get(`primetime_${idd.id}`)
            let fpt = (pt - Date.now());
            let pgu = await primedb.get(`primeuserguild_${idd.id}`)
            let GN = client.guilds.cache.get(pgu)
            let embed = new MessageEmbed()
            .addField(`User:` , `<@${idd.id}> - ${idd.id} - ${idd.tag}`, true)
            .addField(`Status:` , `🟢 Activated`, true)
            .addField(`Server:` , `${GN} - ${pgu}`, true)
            .addField(`Ends At:` , `${humanizeDuration(fpt , { round : true })}`, true)
            .setColor("RANDOM")
             return interaction.editReply({embeds : [embed]})

        }

    }


}

}