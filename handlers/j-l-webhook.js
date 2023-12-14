// webhook.js
const { WebhookClient } = require('discord.js');

const webhookUrl = 'https://discord.com/api/webhooks/1177391571520475146/wBFhTmGTOXJS7wYfMWETnrUAYymAwoIhQKJPepSY541LVUr3_Ex6q7Nx4CKQIvKLjItJ';
const webhookClient = new WebhookClient({ url: webhookUrl });

exports.sendServerInfo = async (guild, event) => {
    await webhookClient.send({
      content: `The bot has ${event === 'join' ? 'joined' : 'left'} a server: ${guild.name}`,
      embeds: [
        {
            title: guild.name,
            description: 'Info about this server.',
            fields: [
                { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Region', value: guild.region, inline: true },
                { name: 'Member Count', value: guild.memberCount, inline: true },
                { name: 'Channel Count', value: guild.channels.cache.size, inline: true },
                { name: 'Role Count', value: guild.roles.cache.size, inline: true },
            ],
              thumbnail: { url: guild.iconURL() },
              timestamp: new Date(),
              },
              ],
              });
};


/*
    await webhook.send({
        embeds: [
            {
                title: guild.name,
                description: 'Info about this server.',
                fields: [
                    { name: 'Owner', value: guild.owner.user.tag, inline: true },
                    { name: 'Region', value: guild.region, inline: true },
                    { name: 'Member Count', value: guild.memberCount, inline: true },
                    { name: 'Channel Count', value: guild.channels.cache.size, inline: true },
                    { name: 'Role Count', value: guild.roles.cache.size, inline: true },
                ],
                thumbnail: { url: guild.iconURL() },
                timestamp: new Date(),
            },
        ],
    });
});
*/

