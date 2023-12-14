const { Database } = require("quickmongo")
const blacklist = new Database(process.env.blacklist_db)
const { WebhookClient } = require('discord.js')
let devs = ["782633686218702848", "431555073290534924"];

module.exports = {
  name: 'blacklist',
   description : "🎗️ Developers Only.",
  cooldown: 3,
  UserPermission: ["SEND_MESSAGES"],
    BotPermission: ["SEND_MESSAGES"],
  async execute(client, interaction) {
 if(!devs.includes(interaction.user.id)) return interaction.editReply("**:x: Developers Only.**")
        let type = interaction.options.getString("type")
        let id = interaction.options.getString("id")
        let ac = interaction.options.getString("action")
      let reason = interaction.options.getString("reason")
        if(reason == null) {
            reason = "Not Selected."
        }

if(type == "user"){
    let u = await client.users.fetch(id)
    if(!u)return interaction.editReply(`**:rolling_eyes: I can't find him/her.**`)
    if(u){
        let d = await blacklist.get(`usersBL_1025134224170291350`)
        if(d == null || !d){
            d = null
        }
        if(ac == "add"){
        if(d.includes(u.id))return interaction.editReply(`**:rolling_eyes: The user is already in blacklist.**`)
        blacklist.push(`usersBL_1025134224170291350` , u.id)
        if(!d.includes(u.id)) await interaction.editReply(`**:v: @${u.username}, has been added to the blacklist.**`)
        let hook = new WebhookClient({ id: "1032235729461444602", token: "im9TQASzzCmbQ3j8ZUUPzAFhgresyloRt0fLi9MnmqzdNbmF5prZVPqTTnEvKNJtLt_" });
         return hook.send(`**🥲 @${u.username}, (ID: \`${u.id}\`) Blacklisted By <@${interaction.user.id}> (ID: \`${interaction.user.id}\`)!**\n\`\`\`${reason}\`\`\``)
        }
        if(ac == "remove"){
            if(!d.includes(u.id))return interaction.editReply(`**:rolling_eyes: The user is not in the blacklist already.**`)
            blacklist.pull(`usersBL_1025134224170291350` , u.id)
            if(d.includes(u.id)) await interaction.editReply(`**:v: @${u.username}, has been unblacklisted.**`)
            let hook = new WebhookClient({ id: "1032235729461344608", token: "im9TQASzzCmbQ3j8ZUUPzAFhgresyloRt0fLi9MnmqzdNbmF5prZVPqTTEvKNJltLt_" });
            return hook.send(`**🎉 @${u.username}, (ID: \`${u.id}\`) UnBlacklisted By <@${interaction.user.id}> (ID: \`${interaction.user.id}\`)!**\n\`\`\`${reason}\`\`\``)
        }

        if(ac == "check"){
            if(!d.includes(u.id))return interaction.editReply(`>>> **📡 @${u.username}, blacklist status is \`false\`**`)
            if(d.includes(u.id))return interaction.editReply(`>>> **📡 @${u.username}, blacklist status is \`true\`**`)

        }
    }
}

if(type == "server"){
    let s = await client.guilds.cache.get(id)
    if(!s)return interaction.editReply(language.blacklist.invalidG)
    if(s){
        let d = await blacklist.get(`serversBL_1025134224170291350`)
        if(d == null || !d){
            d = null
        }
        if(ac == "add"){
        if(d.includes(s.id))return interaction.editReply(`**:rolling_eyes: This server is blacklisted already.**`)
        blacklist.push(`serversBL_1025134224170291350` , s.id)
        if(!d.includes(s.id)) await interaction.editReply(`**:v: ${s.name}, has been blacklisted.**`)
        let hook = new WebhookClient({ id: "1032235729461494608", token: "im9TQASzzCmbQ3j8ZUUPzAFhgresyloRt0fLi9MnmqzdNbmF5prZVPqTTn8vKNJltLt_" });
              return hook.send(`**🥲 Server. ${s.name}, (ID: \`${s.id}\`) Blacklisted By <@${interaction.user.id}> (ID: \`${interaction.user.id}\`)!**\n\`\`\`${reason}\`\`\``)
        }
        if(ac == "remove"){
            if(!d.includes(s.id))return interaction.editReply(`**:rolling_eyes: This server is not blacklisted already.**`)
            blacklist.pull(`serversBL_1025134224170291350` , s.id)
            if(d.includes(s.id)) await interaction.editReply(`**:v: ${s.name}, has been unblacklisted.**`)
            let hook = new WebhookClient({ id: "1032235729461444608", token: "im9TQASzzCmbQ3j8ZUUPzAFhgresyloRt0fLi9MnmqzdNbmF5prZVPqTTnEvKNJltLt_" });
              return hook.send(`**🎉 Server. ${s.name}, (ID: \`${s.id}\`) UnBlacklisted By <@${interaction.user.id}> (ID: \`${interaction.user.id}\`)!**\n\`\`\`${reason}\`\`\``)

        }

        if(ac == "check"){
            if(!d.includes(s.id))return interaction.editReply(`>>> **📡 @${s.name}, blacklist status is \`false\`**`)
            if(d.includes(s.id))return interaction.editReply(`>>> **📡 @${s.name}, blacklist status is \`false\`**`)

        }
    }
}

}
}

