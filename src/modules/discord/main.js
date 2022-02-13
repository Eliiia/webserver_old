const Discord = require("discord.js")
const fs = require("fs")
const conf = require("../../config.json")

const events = {}

for (const file of fs.readdirSync("./modules/discord/events")) {
    const event = require(`./events/${file}`)
    const name = file.split(".")[0]
    events[name] = event
}

const client = new Discord.Client({ intents: 4609 })

Object.keys(events).forEach(eventName => {
    client.on(eventName, events[eventName].bind(null, client))
})

client.login(conf.discord.token)