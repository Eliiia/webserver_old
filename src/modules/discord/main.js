const Discord = require("discord.js")
const conf = require("../../config.json")

const client = new Discord.Client({ intents: 4609 })

client.on("ready", () => {
    console.log(`cool discord bot started as ${client.user.tag}`)
})

client.on("messageCreate", message => {
    if(message.author.bot) return

    if(message.content.startsWith("who")) return message.channel.send("yo mama")
})

client.login(conf.discord.token)