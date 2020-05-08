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
    }

    .logo{
        width:48px;
        display:inline-block;
        cursor:pointer;
        height:48px;
    }

    .logo:hover{
        color:hsl(200,100%,70%);
    }

    .logo span{
        position: absolute;
        transform: translate(-50%,-50%);
        display: inline-block;
        user-select: none;
        font-weight: 100;
        font-size: var(--size);
        top: calc(var(--size) / 2);
        left: calc(var(--size) / 2);
    }

    .search{
        float:right;
        height:var(--size);
        border:none;
        width:calc(calc(100vw - var(--size)) - 40px);
        outline:none;
        color: var(--text);
        background:transparent;
        font-size:32px;
        font-weight: 100;
        padding-left:20px;
        padding-right:20px;
    }

    .search::selection{
        background:hsla(200,100%,70%,40%);
    }

    .res{
        margin-top:-48px;
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
            s('', 20)
            res.classList.remove('hide')
        })
        searchElem.addEventListener('blur', () => {
            res.classList.add('hide')
        })
        searchElem.addEventListener('keyup', () => {
            s(searchElem.value, 20)
        })
        async function s(query) {
            let data = await search(query)
            for (let i = 0; i < res.children.length; i++) {
                if (i >= data.length) {
                    res.children[i].setData({})
                } else {
                    res.children[i].setData(data[i])
                }
            }
        }
    }
})