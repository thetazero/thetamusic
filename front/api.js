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
    let songs = Object.keys(cachedLists)
    let count = 0
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
            count++
            data.push(cachedLists[s])
            if (count >= limit) {
                return data
            }
        }
    }
    return data
}

async function getList(name) {
    if (name in cachedLists) {
        return cachedLists[name]
    }
    return fetch(`${api}/list/${name}`).then(data => data.json()).catch(e => [])
}

let cachedLists = {}
function cachePlaylist(name, songs, val) {
    if (name in cachedLists) {
        return
    }
    cachedLists[name] = val
    window.localStorage.setItem('cachedSongs', JSON.stringify(cachedLists))
    if (!caches) {
        alert("caches are not enabled")
    }
    caches.open(`music-${name}`).then(c => {
        songs.forEach(e => {
            c.add(e)
        })
    })
}

function clearListCache(name) {
    delete cachedLists[name]
    window.localStorage.setItem('cachedSongs', JSON.stringify(cachedLists))
    caches.delete(`music-${name}`)
}

function load() {
    cachedLists = JSON.parse(window.localStorage.getItem('cachedSongs'))
    if (cachedLists == null) {
        cachedLists = {}
    }
}

load()