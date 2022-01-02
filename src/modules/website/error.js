const fs = require("fs")

function getPage(err) {
    return fs.readFileSync(`${__dirname}/www/err/${err}.html`)
}

module.exports = (err, res) => {
    switch(err) {
        case 404: // Not Found
            res.writeHead(404)
            res.end(getPage(404)) // get 404 file
    }
}