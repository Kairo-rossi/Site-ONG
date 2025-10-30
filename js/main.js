// js/main.js

document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos principais do Layout
    const btnMobile = document.getElementById('btn-menu-mobile');
    const menu = document.getElementById('menu-principal');
    const mainContent = document.querySelector('main .container');
    const navLinks = document.querySelectorAll('nav a');


    // --- 1. SETUP DO MENU HAMBÚRGUER (EXISTENTE) ---
    if (btnMobile && menu) {
        btnMobile.addEventListener('click', function() {
            menu.classList.toggle('aberto');
            const isExpanded = btnMobile.getAttribute('aria-expanded') === 'true';
            btnMobile.setAttribute('aria-expanded', String(!isExpanded));
            document.body.classList.toggle('menu-ativo');
        });
        
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('aberto');
                
                // CORREÇÃO 1: Substituindo o '?.setAttribute' por um 'if' tradicional
                const mobileButton = document.getElementById('btn-menu-mobile');
                if (mobileButton) {
                    mobileButton.setAttribute('aria-expanded', 'false');
                }
                
                document.body.classList.remove('menu-ativo');
            });
        });
    }

    // --- 2. SETUP DO MODAL DE FEEDBACK (CORREÇÃO DE AVISO TS) ---
    function setupModal() {
        const modal = document.getElementById('confirmacao-modal');
        const closeBtn = document.getElementById('btn-fechar-modal');
        const confirmBtn = document.getElementById('btn-modal-confirmar');

        if (modal) {
            const closeModal = () => {
                modal.classList.remove('is-visible');
                modal.setAttribute('aria-hidden', 'true');
            };

            // CORREÇÃO: Usando acesso por colchetes para evitar o erro TS
            window['openModal'] = () => {
                modal.classList.add('is-visible');
                modal.setAttribute('aria-hidden', 'false');
            };
            
            // CORREÇÃO 2: Substituindo 'closeBtn?.addEventListener' por 'if'
            if (closeBtn) {
                closeBtn.addEventListener('click', closeModal);
            }
            
            // CORREÇÃO 3: Substituindo 'confirmBtn?.addEventListener' por 'if'
            if (confirmBtn) {
                confirmBtn.addEventListener('click', closeModal);
            }
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
                    closeModal();
                }
            });
        }
    }
    setupModal();
    
    // --- 3. IMPLEMENTAÇÃO DO SPA BÁSICO ---
    // ... (restante da função carregarConteudo e setup de links permanece o mesmo)
    
    /**
     * Carrega o conteúdo na área principal, manipulando a URL (SPA).
     * @param {string} path - O caminho da página (ex: 'index.html', 'projetos.html').
     * @param {boolean} pushState - Se deve adicionar um novo estado ao histórico.
     */
    function carregarConteudo(path, pushState = true) {
        if (!mainContent) return; 

        // 1. Lógica de carregamento de conteúdo
        let novoConteudo = '';
        let novoTitulo = 'Nome da ONG: Juntos pela Causa';

        if (path.includes('projetos.html')) {
            // Usa o template criado no js/projetos.js (DISPONÍVEL GLOBALMENTE)
            if (typeof criarConteudoProjetos === 'function') {
                novoConteudo = criarConteudoProjetos();
                novoTitulo = 'Projetos Sociais | Nome da ONG';
            } else {
                console.error('Função criarConteudoProjetos não definida. Verifique a inclusão de js/projetos.js');
                // Se a função não existe, mostra uma mensagem de erro
                novoConteudo = '<div class="alert alert-erro col-12">Erro ao carregar conteúdo. Verifique o console.</div>';
            }
        } else if (path.includes('index.html') || path === './' || path === '/') {
            // Se for a Home, permitimos a navegação padrão para manter o conteúdo estático inicial.
            // Em um SPA completo, faríamos um fetch() do index.html.
            console.log('Conteúdo da Home carregado (ou mantido).');
            return; // Sai da função para não modificar a Home atual
        } else {
            // Se for outra página (e.g., cadastro.html), permitimos a navegação padrão.
            return;
        }

        // 2. Atualiza o DOM e o Título
        if (novoConteudo) {
            mainContent.innerHTML = novoConteudo;
            document.title = novoTitulo;
        }

        // 3. Manipula o histórico do navegador (SPA)
        if (pushState) {
            // O VS Code pode dar um aviso aqui, mas é a forma de fazer o SPA
            window.history.pushState({ path: path }, novoTitulo, path);
        }
        
        // 4. Atualiza o estado visual da navegação
        navLinks.forEach(link => {
            link.classList.remove('ativo');
            link.removeAttribute('aria-current');
            
            const linkHref = link.getAttribute('href');
            if (linkHref && path.includes(linkHref)) {
                link.classList.add('ativo');
                link.setAttribute('aria-current', 'page');
            }
        });
        window.scrollTo(0, 0); // Rola para o topo da página no carregamento do SPA
    }

    // 4. Configura Event Listeners para Links de Navegação
    navLinks.forEach(link => {
        // Apenas links que queremos que o SPA gerencie (excluindo a home e o cadastro)
        if (link.getAttribute('href') !== 'cadastro.html' && link.getAttribute('href') !== 'index.html') {
            if (!link.getAttribute('href').startsWith('#')) { // Ignorar âncoras locais como #contato
                link.addEventListener('click', (e) => {
                    e.preventDefault(); // Impede o carregamento da página padrão
                    const path = link.getAttribute('href');
                    if (path) {
                        carregarConteudo(path);
                    }
                });
            }
        }
    });
    
    // 5. Permite a Navegação de Volta (Botão Voltar do Browser)
    window.addEventListener('popstate', (e) => {
        
        // Se o e.state é nulo, significa que voltamos ao ponto de partida (Home).
        if (e.state === null) {
            // Usa assign para recarregar a URL atual (index.html)
            window.location.assign('index.html'); 
            return; // Encerra aqui para evitar chamar carregarConteudo desnecessariamente
        }

        const path = e.state.path;
        
        // Chama a função carregarConteudo (que só deve carregar dinamicamente o Projetos.html)
        carregarConteudo(path, false); // 'false' para não adicionar ao histórico
    });
    
});