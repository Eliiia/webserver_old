const fs = require("fs")
const log = require("../../../log.js")

const commands = {}

for (const file of fs.readdirSync("./modules/discord/commands/")) {
    const command = require(`../commands/${file}`)
    const name = file.split(".")[0]
    commands[name] = command
}

module.exports = (client, interaction) => {
    if (!interaction.isCommand()) return
    if (!commands[interaction.commandName]) return

    const command = commands[interaction.commandName]

    let success = false

    try {
        command.run(interaction)
        success = true
    } catch(e) {
        interaction.reply("Ran into an error! :c")
    }

    log("discord", `${interaction.user.tag} ran /${interaction.commandName}`, success)
}