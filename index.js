const template = document.createElement('template');
const link = document.createElement('link');
const linkHref = "http://vli.cacatua.com/SIMPLE/Content/sw-css/azul/siteware.css?version=2104.6";

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
                            <li><a id="main-menu-painel-unidadegerencial"
                                    href="/SIMPLE/MeuPainel#unidadegerencial"><span>Radar da UG</span></a>
                            </li>
                            <li><a id="main-menu-painel-desempenho"
                                    href="/SIMPLE/MeuPainel#desempenho"><span>Desempenho</span></a></li>
                            <li><a id="main-menu-painel-tarefas"
                                    href="/SIMPLE/MeuPainel#tarefas"><span>Tarefas</span></a></li>
                            <li><a id="main-menu-painel-resumo"
                                    href="/SIMPLE/MeuPainel#resumo"><span>Resumo</span></a></li>
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
</div>
`

template.innerHTML = `
<header class="navbar navbar-default navbar-fixed-top" style="background-color:#3777bc">
    <div class="main-navbar">
        <div class="mn-left">
            ${ mainMenu }
        </div>
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

    connectedCallback() {
        const iconButton = this.shadowRoot.querySelector("#main-menu-trigger");

        const mainMenuPopup = this.shadowRoot.querySelector("#mini-popover-main-menu");
        const mainMenuClose = this.shadowRoot.querySelector("#js-main-menu-close");
        const mainMenuswitch = this.shadowRoot.querySelectorAll(".js-main-menu-switch");

        iconButton.addEventListener("click", ()=> mainMenuPopup.style.display = 'block')
        mainMenuClose.addEventListener("click", ()=> mainMenuPopup.style.display = 'none')

        mainMenuswitch.forEach(item => {
            item.addEventListener("mouseenter", (event)=> {
                event.stopPropagation()

                const itemHoveredId = event.target.dataset.id;
                this.shadowRoot.querySelectorAll(`.js-sub-list-wrap`).forEach(body => body.classList.remove("mm-body-active"))

                this.shadowRoot.querySelector(`.js-sub-list-wrap[data-id="${itemHoveredId}"]`).classList.add("mm-body-active")
            });
        });

    }
}

window.customElements.define('stratws-header', StratwsHeader);