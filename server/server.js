const genlists = require('./genlists')

let playlists = genlists('../src')
const express = require('express')
const expressStaticGzip = require('express-static-gzip')
const app = express()
const port = 3000

const build = false

if (build) {
    app.use('', expressStaticGzip("../build", {
        enableBrotli: true,
    }))
} else {
    app.use('', express.static('../front'))
}
app.use('/src/', express.static('../src'))

app.get('/api/lists/:count', (req, res) => {
    req.params.count = Math.min(req.params.count, playlists.length)
    let data = []
    let i = 0
    for (key in playlists) {
        i++
        if (i > req.params.count) {
            break
        }
        p = playlists[key]
        data.push({
            author: p.author,
            size: p.songs.length,
            name: p.name,
        })
    }
    res.json(data)
})

app.get('/api/s/lists/:limit/:query?', (req, res) => {
    let data = []
    let query
    try {
        query = new RegExp(req.params.query, "i")
    } catch (e) {
        res.json([])
        return
    }
    let limit = req.params.limit
    let i = 0
    for (key in playlists) {
        let match
        try {
            match = key.match(query)
        } catch (e) {
            // console.log(e)
            match = false
        }
        if (match) {
            i++
            data.push(playlists[key])
            if (i >= limit) {
                break
            }
        }
    }
    res.json(data)
})

app.get('/api/list/:id', (req, res) => {
    let data = playlists[req.params.id]
    if (data == undefined) {
        res.status(404).status(`playlist ${req.params.id} does not exist`)
    }
    console.log(data, req.params.id)
    let { author, songs, name, path } = data
    res.json({
        author,
        songs,
        name,
        path,
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))