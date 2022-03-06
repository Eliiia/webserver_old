const mimes: {[key: string]: string} = {
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

export default (ext: string) => {
    if(!ext) return "application/octet-stream"
    if (!mimes[ext]) return "application/octet-stream"
    return mimes[ext]
}