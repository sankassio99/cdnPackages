const template = document.createElement('template');
const link = document.createElement('link');
const linkHref = "http://vli.cacatua.com/SIMPLE/Content/sw-css/azul/siteware.css?version=2104.6";


template.innerHTML = `
<header class="navbar navbar-default navbar-fixed-top" style="background-color:#3777bc">
    <div class="main-navbar">
        <div class="mn-left">
            <div id="mainMenuSpace"></div>
        </div>
    </div>

    <div class="mn-center">
        <svg class="mn-logo" >
            <img src="https://cdn.jsdelivr.net/gh/sankassio99/cdnPackages@latest/stratws-logo.svg" type="image/svg+xml"></img>
        </svg>
    </div>
</header>
`

class StratwsHeader extends HTMLElement {
    constructor(){
        super();
        const shadowDoom = this.attachShadow({mode: "open"}); 

        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", linkHref)
        
        shadowDoom.appendChild(link);
        shadowDoom.appendChild(template.content);
    }

    async connectedCallback() {
        await this.getMainMenuHtml();
    }

    async getMainMenuHtml() {
        const promise = new Promise((res, rej) => {
          fetch('/SIMPLE/Initiative/GetMainMenu')
            .then(req => req.text())
            .then((data) => {
                this.writeMainMenu(data);
            })
            .catch((error) => console.log(error));
        })
    }

    writeMainMenu(mainMenuHtml){
        const mainMenuSpace = this.shadowRoot.querySelector("#mainMenuSpace");
        mainMenuSpace.innerHTML = mainMenuHtml

        this.activeMainMenuBehaviors()
    }

    activeMainMenuBehaviors(){
        const iconButton = this.shadowRoot.querySelector("#main-menu-trigger");

        const mainMenuPopup = this.shadowRoot.querySelector("#mini-popover-main-menu");
        const mainMenuClose = this.shadowRoot.querySelector("#js-main-menu-close");
        const mainMenuswitch = this.shadowRoot.querySelectorAll(".js-main-menu-switch");

        iconButton.addEventListener("click", ()=> mainMenuPopup.style.display = 'block')
        mainMenuClose.addEventListener("click", ()=> mainMenuPopup.style.display = 'none')

        mainMenuswitch.forEach(item => {
            item.addEventListener("mouseenter", (event)=> {
                const itemHoveredId = event.target.dataset.id;
                this.shadowRoot.querySelectorAll(`.js-sub-list-wrap`).forEach(body => body.classList.remove("mm-body-active"))

                this.shadowRoot.querySelector(`.js-sub-list-wrap[data-id="${itemHoveredId}"]`).classList.add("mm-body-active")
            });
        });
    }
}

window.customElements.define('stratws-header', StratwsHeader);