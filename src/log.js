const fs = require("fs")

const logFiles = {
    "all": "../logs/all.txt",
    "website": "../logs/website.txt"
}

module.exports = (moduleName, text, status) => {
    let logText = `[${moduleName}] ${text} => ${status}`
    
    console.log(logText)
    
    fs.appendFileSync(logFiles.all, logText+"\n")
    fs.appendFileSync(logFiles.website, text+"\n")
}