const fs = require("fs")

const commands = {}

for (const file of fs.readdirSync("./modules/discord/commands/")) {
    const command = require(`../commands/${file}`)
    const name = file.split(".")[0]
    commands[name] = command
}

module.exports = (client, interaction) => {
    if(!interaction.isCommand()) return
    if(!commands[interaction.commandName]) return

    const command = commands[interaction.commandName]

    command.run(interaction)
}