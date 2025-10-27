// Dados simulados para os Projetos
const DADOS_PROJETOS = [
    {
        titulo: "Alfabetização Digital",
        descricao: "Aulas semanais para idosos e jovens de baixa renda, focando em uso seguro da internet e ferramentas básicas.",
        tags: ["Educação", "Inclusão", "Tecnologia"],
        status: "Ativo"
    },
    {
        titulo: "Banco de Alimentos Comunitário",
        descricao: "Coleta e distribuição mensal de cestas básicas para 50 famílias cadastradas na região metropolitana.",
        tags: ["Alimentação", "Assistência Social"],
        status: "Urgente"
    },
    {
        titulo: "Saúde em Dia",
        descricao: "Parceria com clínicas locais para oferecer consultas e exames básicos gratuitos uma vez por mês.",
        tags: ["Saúde", "Bem-Estar"],
        status: "Aguardando Voluntários"
    }
];

// -------------------------------------------------------------
// SISTEMA DE TEMPLATE JAVASCRIPT
// -------------------------------------------------------------

/**
 * Cria o HTML de um CARD de projeto usando Template Literals (Template JavaScript).
 * @param {object} projeto - Objeto com os dados do projeto.
 * @returns {string} HTML do card.
 */
function criarCardProjeto(projeto) {
    // Mapeia tags para badges HTML
    const badgesHtml = projeto.tags.map(tag => {
        let classe = 'badge-neutro';
        if (tag === 'Educação') classe = 'badge-primario';
        if (tag === 'Alimentação') classe = 'badge-secundario';
        return `<span class="badge ${classe}">${tag}</span>`;
    }).join('');

    // Template Literal (Backticks)
    return `
        <article class="card col-md-4 projeto-card">
            <h3>${projeto.titulo}</h3>
            <p>${projeto.descricao}</p>
            <div class="tags-container">${badgesHtml}</div>
            <p class="status">Status: 
                <span class="badge badge-alerta">${projeto.status}</span>
            </p>
            <a href="#" class="btn btn-primario">Ver Detalhes</a>
        </article>
    `;
}

/**
 * Cria o HTML completo da página "Projetos Sociais" para o SPA.
 * @returns {string} HTML completo do conteúdo da página.
 */
function criarConteudoProjetos() {
    const cards = DADOS_PROJETOS.map(criarCardProjeto).join('');

    return `
        <section id="lista-projetos" class="grid-12">
            <h2 class="col-12" style="text-align: center;">Nossos Projetos Atuais</h2>
            ${cards}
        </section>
        <section id="chamada-voluntario" class="grid-12" style="margin-top: 40px; text-align: center;">
            <div class="alert alert-info col-12">
                Quer fazer a diferença? <a href="cadastro.html">Cadastre-se para participar</a> de um desses projetos!
            </div>
        </section>
    `;
}