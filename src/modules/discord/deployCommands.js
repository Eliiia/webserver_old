const fs = require("fs")
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const conf = require('../../config.json').discord

const commands = []

for (const file of fs.readdirSync("./modules/discord/commands/")) {
	const command = require(`./commands/${file}`)
    const name = file.split(".")[0]
    commands.push(command.info)
}

const body = commands.map(command => command.toJSON())

const rest = new REST({ version: '9' }).setToken(conf.token);

rest.put(Routes.applicationCommands(conf.clientId), { body: body })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error)