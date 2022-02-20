
const types = {
    "css": "text/css",
    "txt": "text/plain",
    "html": "text/html",
    "js": "text/javascript",
    "json": "application/json",
    "gif": "image/gif",
    "ico": "image/vnd.microsoft.icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "svg": "image/svg+xml"
}

module.exports = (path) => {
    let ext = path.split(".").pop()

    if (!types[ext]) return "application/octet-stream"
    return types[ext]
}