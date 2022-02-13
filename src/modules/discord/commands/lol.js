const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports.info = new SlashCommandBuilder()
    .setName("lol")
    .setDescription("replies with lol")

module.exports.run = async (interaction) => {
    interaction.reply("lol lmao")
}