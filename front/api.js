function search(query, limit) {
    return fetch(`${api}/s/lists/${limit}/${query}`).then(data => data.json()).catch(e => [])
}

async function getList(name) {
    return fetch(`${api}/list/${name}`).then(data => data.json()).catch(e => [])
}