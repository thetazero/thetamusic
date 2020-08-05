const fs = require('fs')

module.exports = getLists

function getLists(path) {
    dirs = fs.readdirSync(path)
    dirs = dirs.filter(v => {
        return !v.includes('\.')//bad very bad
    })
    data = {}
    dirs.forEach(dir => {
        let it = readList(path, dir)
        it.path = `/src/${dir}/`
        data[it.name] = it
        delete data[it.name].id
    })
    return data
}

function readList(path, dir) {
    let files = fs.readdirSync(`${path}/${dir}`)
    let meta = JSON.parse(fs.readFileSync(`${path}/${dir}/_meta.json`))
    files = files.filter(e => {
        return e != '_meta.json' && e != '.DS_Store'
    })
    meta.songs = files
    meta.path = path
    meta.id = dir
    return meta
}

