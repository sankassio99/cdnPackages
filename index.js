const template = document.createElement('template');

const mainMenu = `
<div class="main-menu-wrap mini-popover">
<a class="mm-trigger" id="main-menu-trigger" data-mini-popover="true"
    data-mini-popover-conteudo="mini-popover-main-menu">
    <svg>
        <use xlink:href="/SIMPLE/Content/svg/modulos.svg#painel"></use>
    </svg>
    <span class="versao">2104.6</span>
</a>
<div id="mini-popover-main-menu" class="mp-box">
    <div class="mp-content">
        <div class="main-menu">
            <div class="mm-ctrl">
                <ul class="mm-list">
                    <li class="mm-featured-item">
                        <a id="js-main-menu-close" class="cursor-pointer">
                            <i class="fa fa-times"></i>
                        </a>
                    </li>
                    <li>
                        <a id="main-menu-painel" href="/SIMPLE/MeuPainel" class="js-main-menu-switch"
                            data-id="mm-sub-painel">
                            <svg>
                                <use xlink:href="/SIMPLE/Content/svg/modulos.svg#painel"></use>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a id="main-menu-performance" href="/SIMPLE/PerformanceCorporativa"
                            class="js-main-menu-switch" data-id="mm-sub-results">
                            <svg>
                                <use xlink:href="/SIMPLE/Content/svg/modulos.svg#performance"></use>
                            </svg>
                        </a>
                    </li>
                    <li class="mm-ctrl-active">
                        <a id="main-menu-melhorias" href="/SIMPLE/OportunidadesDeMelhoria"
                            class="js-main-menu-switch" data-id="mm-sub-actions">
                            <svg>
                                <use xlink:href="/SIMPLE/Content/svg/modulos.svg#melhorias"></use>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a id="main-menu-admin" href="/SIMPLE/Configuracoes" class="js-main-menu-switch"
                            data-id="mm-sub-admin">
                            <svg>
                                <use xlink:href="/SIMPLE/Content/svg/modulos.svg#configuracoes"></use>
                            </svg>
                        </a>
                    </li>
                </ul>

            </div>
            <div class="mm-body js-listagem-menus">
                <div class="js-sub-list-wrap mm-sub-list-wrap" data-id="mm-sub-painel">
                    <div class="mm-title">Meu Painel</div>
                    <ul class="mm-sub-list">
                        <li><a id="main-menu-painel-agenda"
                                href="/SIMPLE/MeuPainel#agenda"><span>Agenda</span></a></li>
                        <li><a id="main-menu-painel-radar"
                                href="/SIMPLE/MeuPainel#radar"><span>Radar</span></a></li>
                    </ul>
                </div>
                <div class="js-sub-list-wrap mm-sub-list-wrap" data-id="mm-sub-results">
                    <div class="mm-title">Performance Corporativa</div>
                    <ul class="mm-sub-list">
                        <li><a id="main-menu-performance-planilha"
                                href="/SIMPLE/PerformanceCorporativa/PlanilhaDeIndicadores"><span>Planilha</span></a>
                        </li>
                    </ul>
                </div>
                <div class="js-sub-list-wrap mm-sub-list-wrap mm-body-active" data-id="mm-sub-actions">
                    <div class="mm-title">Oportunidades de Melhoria</div>
                    <ul class="mm-sub-list">
                        <li><a id="main-menu-melhorias-iniciativas"
                                href="/SIMPLE/Initiatives"><span>Iniciativas</span></a></li>
                    </ul>
                </div>
                <div class="js-sub-list-wrap mm-sub-list-wrap" data-id="mm-sub-admin">
                    <div class="mm-title">Configurações</div>
                    <ul class="mm-sub-list">
                        <li><a id="main-menu-admin-configuracoes"
                                href="/SIMPLE/Configuracoes"><span>Configurações</span></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
`

template.innerHTML = `
<header class="navbar navbar-default navbar-fixed-top" style="background-color:#3777bc">
    <div class="main-navbar">
        <div class="mn-left">
            <div id="mainMenuSpace"></div>
        </div>
        <div class="mn-center">
            <svg class="mn-logo" >
                <img src="https://cdn.jsdelivr.net/gh/sankassio99/cdnPackages@latest/stratws-logo.svg" type="image/svg+xml"></img>
            </svg>
        </div>
    </div>

</header>
`

class StratwsHeader extends HTMLElement {
    constructor(){
        super();
        const shadowDoom = this.attachShadow({mode: "open"}); 

        shadowDoom.appendChild(this.styles());

        shadowDoom.appendChild(this.stratwsStylesLink());
        
        shadowDoom.appendChild(this.fontAwesomeCDN());

        shadowDoom.appendChild(template.content);
    }

    async connectedCallback() {
        await this.getMainMenuHtml();
    }

    stratwsStylesLink(){
        const link = document.createElement('link');
        const linkHref = "http://vli.cacatua.com/SIMPLE/Content/sw-css/azul/siteware.css?version=2104.6";
        
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
        const promise = new Promise((res, rej) => {
          fetch('/SIMPLE/Initiative/GetMainMenu')
            .then(res => res.status == 404 ? mainMenu : res.text())
            .then((data) => {
                this.writeMainMenu(data);
                this.activeMainMenuBehaviors()
            })
            .catch((error) => console.log(error));
        })
    }

    writeMainMenu(mainMenuHtml){
        const mainMenuSpace = this.shadowRoot.querySelector("#mainMenuSpace");
        mainMenuSpace.innerHTML = mainMenuHtml
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