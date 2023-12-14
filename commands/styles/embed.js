const line = 'https://media.discordapp.net/attachments/1177381703933763624/1181532493933981777/Push-link.png';
module.exports = class Embed {
 constructor(url) {
    this.thumbnail = { url };
 }

  
 addField(name, value, inline) {
    if (!this.fields) this.fields = [];
    this.fields.push({ name, value, inline });
 }

   setAuthor(name, iconURL, url) {
      this.author = { name, iconURL, url };
   }

   setDescription(description) {
      this.description = description;
   }

 setFooter(text, iconURL) {
    this.footer = { text, iconURL };
 }

 setImage(url) {
    this.image = { url };
 }

 setThumbnail(url) {
    this.thumbnail = { url };
 }

 setTimestamp(timestamp) {
    this.timestamp = timestamp;
 }

 setURL(url) {
    this.url = url;
 }

 toJSON() {
    return {
      title: this.title,
      description: this.description,
      color: this.color,
      fields: this.fields,
      author: this.author,
      footer: this.footer,
      image: this.image,
      thumbnail: this.thumbnail,
      timestamp: this.timestamp,
      url: this.url,
 };
 }
   toP() {
      return {
        title: '<:P_Staff:1177386381861998732> Command Respond ..',
        description: this.description,
        color: '9c2a2a',
        fields: this.fields,
        author: this.author,
        footer: this.footer,
        image: this.image,
        thumbnail: this.thumbnail,
        timestamp: this.timestamp,
        url: this.url,
      };
   }
};

// const embed = new Embed('Title', 'Description', 0xFF5733);

/*
embed.addField('Field 1', 'Value 1', true);
embed.addField('Field 2', 'Value 2', true);
embed.setAuthor('Author', 'https://example.com/icon.png', 'https://example.com');
embed.setFooter('Footer', 'https://example.com/footer-icon.png');
embed.setImage('https://example.com/image.png');
embed.setThumbnail('https://example.com/thumbnail.png');
embed.setTimestamp();
embed.setURL('https://example.com');
*/

/*
client.on('message', (msg) => {
 if (msg.content === '!embed') {
    const embed = new Embed('Title', 'Description', 0xFF5733);
    // ... Set up the embed here

    msg.channel.send({ embed: embed.toJSON() });
 }
});
*/