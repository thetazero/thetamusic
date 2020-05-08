customElements.define('theta-list', class extends HTMLElement {
    constructor() {
        super()
        let shadow = this.attachShadow({
            mode: 'open'
        })
        this._queue = []
        this._srcs = []
        this._id = 0
        shadow.innerHTML = `
<style>
:host{
    height:calc(100vh - 48px);
    display:block;
    width:100%;
}
#songs{
    height:calc(100% - 64px);
    overflow-y:scroll;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: hsla(200,0%,0%,0.3);
  border-radius:5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: hsl(200,0%,0%,0.3);
}

#controller{
    position:absolute;
    bottom:0px;
    width:100%;
    height:64px;
    background:hsl(200,10%,15%);
}
#songs div {
    height:32px;
    line-height:32px;
    padding:0px 20px;
    overflow-x:hidden;
    overflow-y:hidden;
}
#songs div.selected{
    background:hsl(200,50%,15%) !important;
    color:#bbb;
}
#songs div:nth-child(even){
    background:hsla(0,0%,0%,0.1);
}

#controller{
    text-align:center;
}

#play{
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight:100 !important;
    user-select: none;
    font-size: 64px;
    line-height:64px;
    cursor:pointer;
    transform:rotate(0deg);
    display:inline-block;
    transition:transform 200ms;
}
#play.rotate{
    transform:rotate(450deg);
}
#play:hover{
    color:hsl(200,40%,80%);
}

#play:active{
    color:hsl(200,100%,70%);
}
</style>
<div id="songs">

</div>
<div id="controller">
<a id="play" class="rotate">Θ</a>
</div>
<audio src="" id="audio"></audio>`
        let audioelem = this.shadowRoot.querySelector('#audio')
        audioelem.addEventListener('ended', e => {
            this.next()
        })
        let playbtn = this.shadowRoot.querySelector("#play")
        this.playing = false
        playbtn.addEventListener('click', () => {
            this.toggle()
            if (this.playing) {
                playbtn.classList.remove('rotate')
            } else {
                playbtn.classList.add('rotate')
            }
        })
    }

    get queue() {
        return this._queue
    }

    set queue(val) {
        this._queue = val
        this.shadowRoot.querySelector('#songs').innerHTML = val.map((e, i) => {
            if (i == this._id) {
                return `<div class='selected'>${e}</div>`
            }
            return `<div>${e}</div>`
        }).join('\n')
        Array.from(this.shadowRoot.querySelectorAll('#songs div')).forEach((elem, index) => {
            elem.addEventListener('click', () => {
                this.id = index
                this.play()
            })
        })
    }

    set id(value) {
        let songElems = this.shadowRoot.querySelectorAll('#songs div')
        songElems[this._id].classList.remove('selected')
        this._id = value
        if (this._id == this.queue.length) {
            this._id = 0
        }
        songElems[this._id].classList.add('selected')
        let audioelem = this.shadowRoot.querySelector('#audio')
        audioelem.src = this._srcs[this._id]
    }

    get id() {
        return this._id
    }

    _clearQueue() {
        this.queue = []
    }

    _setQueue(val) {
        console.log(val)
        this.queue = val.songs
        val.songs.forEach(e => {
            this._srcs.push(`/src/${val.name}/${e}`)
        })
        this.id = 0
        // this.play()
    }
    play() {
        let audioelem = this.shadowRoot.querySelector('#audio')
        audioelem.play()
        this.playing = true
    }

    pause() {
        let audioelem = this.shadowRoot.querySelector('#audio')
        audioelem.pause()
        this.playing = false
    }

    toggle() {
        if (this.playing) {
            this.pause()
        } else {
            this.play()
        }
        console.log(this.playing)
    }

    next() {
        this.id++
        this.play()
    }
})