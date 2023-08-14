import header from './header.html'
import mainMenuDefault from './mainMenu.html'

class StratwsHeader extends HTMLElement {
    constructor(){
        super();
        const shadowDom = this.attachShadow({mode: "open"}); 

        shadowDom.appendChild(this.styles());

        shadowDom.appendChild(this.stratwsStylesLink());
        
        shadowDom.appendChild(this.fontAwesomeCDN());

        shadowDom.appendChild(this.createTemplate());
    }

    createTemplate() {
        const template = document.createElement('template');
        template.innerHTML = header;
        return template.content;
    }

    async connectedCallback() {
        let mainMenuHtml = await this.getMainMenuHtml();

        if(mainMenuHtml === undefined){
            mainMenuHtml = mainMenuDefault;
        }

        this.writeMainMenu(mainMenuHtml);
        this.activeMainMenuBehaviors();
    }

    stratwsStylesLink(){
        const link = document.createElement('link');
        // REPLACE TO PRODUCTION URL:
        const linkHref = "http://vli.cacatua.com/SIMPLE/Content/sw-css/modules/main-navbar.css?version=2104.6";
        
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", linkHref);

        return link;
    }

    fontAwesomeCDN(){
        const link = document.createElement('link');
        const linkHref = "https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css";
        
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", linkHref);
        link.setAttribute("type", "text/css");

        return link;
    }

    styles(){
        const style = document.createElement('style');
        style.textContent = `
            
        `

        return style;
    }

    async getMainMenuHtml() {
        return new Promise((resolve, reject) => resolve(
            fetch('/SIMPLE/Initiative/GetMainMenu')
                .then(res => res.status == 404 ? undefined : res.text())
                .then((data) => data)
                .catch((error) => error)
        ));
    }

    writeMainMenu(mainMenuHtml){
        const mainMenuSpace = this.shadowRoot.querySelector("#mainMenuSpace");
        mainMenuSpace.innerHTML = mainMenuHtml
    }

    activeMainMenuBehaviors(){
        const popover = this.shadowRoot.querySelector("#mini-popover-main-menu");
        const openButton = this.shadowRoot.querySelector("#main-menu-trigger");

        this.openMenuOnClick(openButton, popover);
        
        this.closeMenuOnClickCloseIcon(popover);
        
        this.showListOnHoverIcon();

        this.closeMenuOnClickOutside(popover, openButton);

    }

    openMenuOnClick(openButton, popover) {
        openButton.addEventListener("click", () => popover.style.display = 'block');
    }

    closeMenuOnClickCloseIcon(popover) {
        const closeBtn = this.shadowRoot.querySelector("#js-main-menu-close");
        closeBtn.addEventListener("click", () => popover.style.display = 'none');
    }

    showListOnHoverIcon() {
        const switchItems = this.shadowRoot.querySelectorAll(".js-main-menu-switch");
        switchItems.forEach(item => {
            item.addEventListener("mouseenter", (event) => {
                const itemHoveredId = event.target.dataset.id;
                this.shadowRoot.querySelectorAll(`.js-sub-list-wrap`).forEach(body => body.classList.remove("mm-body-active"));

                this.shadowRoot.querySelector(`.js-sub-list-wrap[data-id="${itemHoveredId}"]`).classList.add("mm-body-active");
            });
        });
    }

    closeMenuOnClickOutside(popover, openButton) {
        popover.addEventListener("click", (event) => event.stopPropagation());
        openButton.addEventListener("click", (event) => event.stopPropagation());
        window.addEventListener("click", () => {
            if (popover.style.display == 'block') {
                popover.style.display = 'none';
            }
        });
    }
}

window.customElements.define('stratws-header', StratwsHeader);