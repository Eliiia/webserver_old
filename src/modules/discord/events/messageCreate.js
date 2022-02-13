module.exports = (client, message) => {
    if(message.author.bot) return

    if(message.content.startsWith("who")) return message.channel.send("yo mama")
}