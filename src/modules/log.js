const fs = require("fs")

const logFiles = {
    "all": "../logs/all.txt",
    "website": "../logs/website.txt"
}

module.exports = (moduleName, text) => {
    let logText = `[${moduleName}] ${text}`
    
    console.log(logText)
    
    fs.appendFileSync(logFiles.all, logText+"\n")
    fs.appendFileSync(logFiles.website, text+"\n")
}