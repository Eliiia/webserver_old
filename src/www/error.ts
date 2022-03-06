import { readFileSync } from "fs"

const dir = `${__dirname}/../../../www`

export default (err: 404) => {
    return readFileSync(`${dir}/err/${err}.html`, "utf8")
}