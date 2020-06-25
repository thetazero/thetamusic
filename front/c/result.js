customElements.define('theta-result', class extends HTMLElement {
    constructor() {
        super()
        let shadow = this.attachShadow({
            mode: 'open'
        })
        this.addEventListener('click', async () => {
            let data = await getList(this._n)
            listElem.pause()
            listElem._setQueue(data)
        })
        shadow.innerHTML = `
<style>
:host{
    display:block;
    height:48px;
    padding:0px 10px;
}
.author{
    font-size:.7em;
    color:var(--textsubtle);
}
.songs{
    float:right;
}
.offline{
    display:none;
}
.offline.yes{
    display:inline-block;
}
.offline{
    cursor:pointer;
}
.offline:hover span{
    color:var(--hover);
}
.offline:active span{
    color:var(--active);
}
</style>
<span class='offline x'>[<span class='x'>x</span>]</span>
<span class='name'></span>
<span class='author'></span>
<span class='songs'></span>
`
    }

    setData({ name, author, songs }) {
        let o = this.shadowRoot.querySelector('.offline')
        let a = this.shadowRoot.querySelector('.author')
        let n = this.shadowRoot.querySelector('.name')
        let s = this.shadowRoot.querySelector('.songs')
        if (name in cachedLists) {
            o.classList.add('yes')
        } else {
            o.classList.remove('yes')
        }
        if (author == undefined) {
            a.innerText = ''
            n.innerText = ''
            s.innerText = ''
        } else {
            a.innerText = author
            n.innerText = name
            s.innerText = `${songs.length} song${songs.length > 1 ? 's' : ''}`
        }
        this._n = name
        this.addEventListener('click', ({ path }) => {
            if (path[0].classList.contains('x')) {
                clearListCache(name)
                o.classList.remove('yes')
            } else {
                navElem.hide()
            }
        })
    }
})