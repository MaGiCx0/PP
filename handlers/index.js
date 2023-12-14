
const fs    = require("fs");
const colors = require("colors")

/**
 * Load Events
 */
console.log(`---------------------------------------`.bold.yellow)
const loadEvents = async function (client) {
    const eventFolders = fs.readdirSync(`${client.cwd}/events`);
    for (const folder of eventFolders) {
        const eventFiles = fs
            .readdirSync(`${client.cwd}/events/${folder}`)
            .filter((file) => file.endsWith(".js"));

        for (const file of eventFiles) {
            const event = require(`${client.cwd}/events/${folder}/${file}`);

            if (event.name) {
                console.log(` ✔️ => Event ${file} is being loaded `.bold.green);
            } else {
                console.log(` ❌ => Event ${file} missing a help.name or help.name is not in string `.bold.red);
                continue;
            }

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
console.log(`---------------------------------------`.bold.yellow)
}
/**
 * Load Prefix Commands
 */
const loadCommands = async function (client) {
    const commandFolders = fs.readdirSync(`${client.cwd}/commands/legacy/`);
    for (const folder of commandFolders) {
        const commandFiles = fs
            .readdirSync(`${client.cwd}/commands/legacy/${folder}`)
            .filter((file) => file.endsWith(".js"));

        for (const file of commandFiles) {
            const command = require(`${client.cwd}/commands/legacy/${folder}/${file}`);

            if (command.name) {
                client.commands.set(command.name, command);
            } else {
                console.log((` ❌ => Prefix Command ${file} missing a help.name or help.name is not in string `));
                continue;
            }

            if (command.aliases && Array.isArray(command))
                command.aliases.forEach((alias) => client.aliases.set(alias, command.name));
        }
      console.log(` ✔️ => PrefixCommands = ${client.commands.size} is loaded `.bold.blue);
    }
}

/**
 * Load SlashCommands
 */
const loadSlashCommands = async function (client) {
    let slash = [];

    const commandFolders = fs.readdirSync(`${client.cwd}/commands/slash`);
    for (const folder of commandFolders) {
        const commandFiles = fs
            .readdirSync(`${client.cwd}/commands/slash/${folder}`)
            .filter((file) => file.endsWith(".js"));

        for (const file of commandFiles) {
            const command = require(`${client.cwd}/commands/slash/${folder}/${file}`);

            if (command.name) {
                client.slash.set(command.name, command);
                slash.push(command)
            } else {
                console.log(` ❌ => SlashCommand ${file} missing a help.name or help.name is not in string `.bold.red);
                continue;
            }

        }
    }
  console.log(` ✔️ => SlashCommands = ${client.slash.size} is loaded`.bold.blue);

    client.on("ready", async() => {
        // Register Slash Commands for a single guild
        // await client.guilds.cache
        //    .get("YOUR_GUILD_ID")
        //    .commands.set(slash);

        console.log('Register Slash Commands for all the guilds.');
        await client.application.commands.set(slash)
    })
}

module.exports = {
    loadEvents,
    loadCommands,
    loadSlashCommands
}