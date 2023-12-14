const { WebhookClient, MessageEmbed } = require('discord.js');
const { Database } = require('quickmongo')
const primedb = new Database(process.env.prime_db)
const badgesdb = new Database(process.env.badges_db)
const dailytime = new Database(process.env.coinstime_db)
const humanizeDuration = require("humanize-duration")

module.exports = {
  name: 'user',
  description: '👤 Show user info.',
  options: [{
    name: 'user',
    description: 'The User.',
    type: 6,
    required: false
  }],
  cooldown: 3,
  UserPermission: ["SEND_MESSAGES"],
  BotPermission: ["EMBED_LINKS"],
  async execute(client, interaction) {
    let User = interaction.options.getUser("user")
if(!User){
    User = interaction.member
  }
        if(User.bot) {
            return interaction.editReply(`**:rolling_eyes: Bots doesn't have an information.**`)
        }
let prime = await primedb.fetch(`primeguilds_${interaction.guild.id}`)
    if(prime == null) {
        prime = false
    }
    if(prime !== true) {
        let uuuu = await client.guilds.cache.get(interaction.guild.id).members.cache.get(User.id)
    if(!uuuu) {
        return interaction.editReply(`**:rolling_eyes: I can't find this user.**`)
    }
    }
    var badges = "";
    var createdat = "0";
    var joinedat = "0";
    var namee = "";
    if(User.id !== interaction.user.id) {
      createdat = User.createdTimestamp
      joinedat = interaction.guild.members.cache.get(User.id).joinedTimestamp
        namee = User.username
    } else {
      createdat = User.user.createdTimestamp
      joinedat = User.joinedAt
        namee = User.user.username
    }
    let sadmin = await badgesdb.fetch(`sharebotadmin_${User.id}`)
    if(sadmin == true) {
      badges += "<:ShareBotAdmin:1034620545964191844>"
    }
    let sstaff = await badgesdb.fetch(`sharebotstaff_${User.id}`)
    if(sstaff == true) {
      badges += "<:ShareBotStaff:1034620217990586408>"
    }
    let sverified = await badgesdb.fetch(`sharebotverified_${User.id}`)
    if(sverified == true) {
      badges += "<:ShareBotVerified:1034625414276075621>"
    }
    let sbug = await badgesdb.fetch(`sharebotbughunter_${User.id}`)
    if(sbug == true) {
      badges += "<:ShareBotBugHunter:1044594800013344780>"
    }
    let stranslator = await badgesdb.fetch(`sharebottranslator_${User.id}`)
    if(stranslator == true) {
      badges += "<:ShareBotTranslator:1044598484495515668>"
    }
    let ssugg = await badgesdb.fetch(`sharebotsug_${User.id}`)
    if(ssugg == true) {
      badges += "<:ShareBotSuggester:1044596406138179594>"
    }
        /*
    let spartner = await badgesdb.fetch(`sharebotpartner_${User.id}`)
    if(spartner == true) {
      badges += "<:ShareBotPartner:1034620348869660812>"
    }*/
    let sprime = await primedb.get(`primestatus_${User.id}`)
    if(sprime == true) {
      badges += "<:ShareBotPrime:1044599396563689502>"
    }
    let sfriend = await badgesdb.fetch(`sharebotfriend_${User.id}`)
    if(sfriend == true) {
      badges += "<:ShareBotFriend:1044599690303385650>"
    }
    let searly = await badgesdb.fetch(`sharebotearly_${User.id}`)
    if(searly == true) {
      badges += "<:ShareBotEarly:1044594275524038666>"
    }
    let sevents = await badgesdb.fetch(`sharebotevents_${User.id}`)
    if(sevents == true) {
      badges += "<:ShareBotEvents:1044593778880696423>"
    }
    let sbooster = await badgesdb.fetch(`sharebotbooster_${User.id}`)
    if(sbooster == true) {
      badges += "<:ShareBotBooster:1044595105102835722>"
    }
    let timeout = 86400000;
    var daily = ""
    let dailyt = await dailytime.get(`dailycooldown_${User.id}`)
         if (dailyt !== null && timeout - (Date.now() - dailyt) > 0) {
        let time = humanizeDuration(timeout - (Date.now() - dailyt));
           daily = time
         } else {
           daily = "You can collect it. `/daily`"
         }
    let e = new MessageEmbed()
    .setAuthor({ name: namee, iconURL: User.displayAvatarURL({ dynamic: true }) })
    .setColor('#9c2a2a')
//    .setFooter(`By: ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
      .setImage('https://media.discordapp.net/attachments/1177362252161101914/1180731189821182022/Push-link_copy.png')
    .setThumbnail(User.displayAvatarURL({ dynamic: true }))
    .addField(`Created At:`, `**<t:${Math.floor(createdat/1000.0)}:R>**`, true)
    .addField(`Joined At:`, `**<t:${Math.floor(joinedat/1000.0)}:R>**`, true)
    .addField(`Daily Collect:`, `**${daily}**`, true)
    .addField(`Badges:`, `**${badges || "None"}**`, true)
    return interaction.editReply({ embeds: [e] })
  }
}
