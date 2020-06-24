customElements.define('theta-nav', class extends HTMLElement {
    constructor() {
        super()
        let shadow = this.attachShadow({
            mode: 'open'
        })
        shadow.innerHTML = `
<style>
    :host{
        display:block;
        --size:48px;
        height:var(--size);
        background:hsl(200,10%,15%);
        line-height:var(--size);
        position:absolute;
        width:100%;
        top:0px;
    }

    nav{
        z-index:100;
        height:var(--size);
    }

    .logo, .wifi-indicator {
        width:48px;
        display:inline-block;
        cursor:pointer;
        height:48px;
    }

    .logo:hover, .wifi-indicator.on:hover {
        color:hsl(200,100%,70%) !important;
    }

    .logo span, .wifi-indicator span {
        position: absolute;
        user-select: none;
        font-weight: 100;
        font-size: var(--size);
        top: calc(var(--size) / 2);
        display:inline-block;
    }

    .logo span {
        left: calc(var(--size) / 2);
        transform: translate(-50%,-50%);
    }

    .wifi-indicator span {
        right: calc(var(--size) / 2);
        transform: translate(50%,-50%);
    }

    .wifi-indicator .slash{
        transform: translate(-50%,-50%) scale(0.001);
        transition: transform 100ms;
    }

    .wifi-indicator.off {
        color:var(--textsubtle);
    }

    .wifi-indicator.off .slash {
        transform: translate(50%,-50%) scale(1);
    }

    .search {
        display:inline-block;
        height:var(--size);
        border:none;
        width:calc(calc(100vw - var(--size)) - var(--size));
        outline:none;
        color: var(--text);
        background:transparent;
        font-size:32px;
        font-weight: 100;
        padding-left:20px;
        padding-right:20px;
        box-sizing:border-box;
        transform: translateY(-14px);
    }

    .search::selection{
        background:hsla(200,100%,70%,40%);
    }

    .res{
        background:hsl(200,10%,15%);
        width:100%;
        transition:margin-left 200ms;
        height:calc(100vh);
        overflow-y:hidden;
    }

    .res theta-result:nth-child(odd){
        background:hsl(200,10%,12%);
    }
    .res.hide{
        margin-left:-100%;
    }
</style>
<nav>
    <a class='logo'>
        <span>Θ</span>
        <span>M</span>
    </a>
    <input type='text' class='search'>
    <a class='wifi-indicator on'>
        <span>W</span>
        <span class='slash'>/</span>
    </a>
</nav>

<div class='res hide'>
    <theta-result></theta-result>
    <theta-result></theta-result>
    <theta-result></theta-result>
    <theta-result></theta-result>
    <theta-result></theta-result>
    <theta-result></theta-result>
    <theta-result></theta-result>
    <theta-result></theta-result>
    <theta-result></theta-result>
    <theta-result></theta-result>
    <theta-result></theta-result>
    <theta-result></theta-result>
    <theta-result></theta-result>
    <theta-result></theta-result>
    <theta-result></theta-result>
    <theta-result></theta-result>
    <theta-result></theta-result>
    <theta-result></theta-result>
    <theta-result></theta-result>
    <theta-result></theta-result>
</div>`
        let searchElem = this.shadowRoot.querySelector('.search')
        let res = this.shadowRoot.querySelector('.res')
        searchElem.addEventListener('focus', () => {
            s('')
            res.classList.remove('hide')
        })
        searchElem.addEventListener('blur', () => {
            searchElem.value = ''
            res.classList.add('hide')
        })
        searchElem.addEventListener('keyup', () => {
            s(searchElem.value)
        })
        async function s(query) {
            let data = await search(query, 20)
            for (let i = 0; i < res.children.length; i++) {
                if (i >= data.length) {
                    res.children[i].setData({})
                } else {
                    res.children[i].setData(data[i])
                }
            }
        }
        this.wifiElem = this.shadowRoot.querySelector('.wifi-indicator')
        this.wifiElem.addEventListener('click', () => {
            online = !online
            if (online) {
                this.online()
            } else {
                this.offline()
            }
        })
        if (!online) {
            this.offline()
        }
    }

    online() {
        this.wifiElem.classList.remove('off')
        this.wifiElem.classList.add('on')
    }

    offline() {
        this.wifiElem.classList.remove('on')
        this.wifiElem.classList.add('off')
    }
})