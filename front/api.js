let online = true

function search(query, limit) {
    if (online) {
        return fetch(`${api}/s/lists/${limit}/${query}`).then(data => data.json()).catch(e => [])
    }
    let data = []
    try {
        query = new RegExp(query, "i")
    } catch (e) {
        return data
    }
    let songs = Object.keys(cachedPlaylists)
    for (let i = 0; i < songs.length; i++) {
        let s = songs[i]
        console.log(s)
        let match
        try {
            match = s.match(query)
        } catch (e) {
            match = false
        }
        if (match) {
            i++
            data.push(cachedPlaylists[s])
            if (i >= limit) {
                return data
            }
        }
    }
    return data
}

async function getList(name) {
    if (name in cachedPlaylists) {
        return cachedPlaylists[name]
    }
    return fetch(`${api}/list/${name}`).then(data => data.json()).catch(e => [])
}

let cachedPlaylists = {}
function cachePlaylist(name, songs, val) {
    if (name in cachedPlaylists) {
        return
    }
    cachedPlaylists[name] = val
    window.localStorage.setItem('cachedSongs', JSON.stringify(cachedPlaylists))
    caches.open(`music-${name}`).then(c => {
        songs.forEach(e => {
            c.add(e)
        })
    })
}

function load() {
    cachedPlaylists = JSON.parse(window.localStorage.getItem('cachedSongs'))
    if (cachedPlaylists == null) {
        cachedPlaylists = {}
    }
}

load()