const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Database } = require("quickmongo")
const db = new Database(process.env.share_db)

module.exports = {
  name: 'channel',
  description: '⚙️ Select the bumping channel',
  options: [{
      name: 'channel',
      type: 7,
      description: '🤔 Mention/Name/ID Channel.',
      required: true,
  }],
  cooldown: 5,
  UserPermission: ["MANAGE_CHANNELS"],
  BotPermission: ["SEND_MESSAGES"],
  async execute(client, interaction) {

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
}