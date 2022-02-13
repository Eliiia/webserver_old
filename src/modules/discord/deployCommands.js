const fs = require("fs")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const conf = require('../../config.json');

const commands = []

for (const file of fs.readdirSync("./modules/discord/commands/")) {
	const command = require(`./commands/${file}`)
    const name = file.split(".")[0]
    commands[name] = command.info
}

const body = commands.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(conf.discord.token);

rest.put(Routes.applicationCommands(conf.discord.clientId), { body: body })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);