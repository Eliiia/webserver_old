const fs = require("fs")

module.exports = (moduleName, text, status) => {
    let d = new Date()

    let colour = ""
    if(moduleName === "website" || moduleName === "api") {
        if(100 <= status && status < 400) colour = "[32m"
        else if(400 <= status && status < 500) colour = "[33m"
        else if(500 <= status && status < 600) colour = "[31m"
    }
    else if(moduleName === "discord") {
        if(status) colour = "[32m"
        else colour = "[31m"

        if(status) status = "success"
        else status = "failure"
    }
    else if(moduleName === "redirect") {
        colour = "[32m"
    }
    else throw Error(`log.js; unknown moduleName passed\n\tmoduleName: ${moduleName}`)

    let logText = `[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}] [${moduleName}] ${text} => \x1b${colour}${status}\x1b[39m`
    let logTextMod = `[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}] ${text} => \x1b${colour}${status}\x1b[39m`

    console.log(logText)
    
    fs.appendFileSync(`../logs/all_${d.getFullYear()}-${d.getMonth()}-${d.getDate()}.txt`, logText+"\n")
    fs.appendFileSync(`../logs/${moduleName}_${d.getFullYear()}-${d.getMonth()}-${d.getDate()}.txt`, logTextMod+"\n")
}