const fs = require("fs")

module.exports = (moduleName, text, status) => {
    let d = new Date()

    let logText = `[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}] [${moduleName}] ${text} => ${status}`
    let logText2 = `[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}] ${text} => ${status}`

    console.log(logText)
    
    fs.appendFileSync(`../logs/all_${d.getDate()}-${d.getMonth()}-${d.getFullYear()}.txt`, logText+"\n")
    fs.appendFileSync(`../logs/${moduleName}_${d.getDate()}-${d.getMonth()}-${d.getFullYear()}.txt`, logText2+"\n")
}