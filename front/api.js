async function search(query, limit) {
    let data = [];
    try {
        data = await fetch(`${api}/s/lists/${limit}/${query}`)
        data = await data.json()
    } catch (e) {
        console.log(e)
    }
    return data
}

async function getList(name) {
    let data = []
    try {
        data = await fetch(`${api}/list/${name}`)
        data = await data.json()
    } catch (e) {
        console.log(e)
    }
    return data
}