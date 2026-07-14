import "./App.css";

const leads = [
  { nome: "Maria Silva", origem: "Instagram", status: "Novo lead" },
  { nome: "João Santos", origem: "WhatsApp", status: "Em atendimento" },
  { nome: "Fernanda Lima", origem: "Facebook", status: "Simulação enviada" },
  { nome: "Carlos Souza", origem: "Indicação", status: "Visita marcada" },
];

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div>
          <h1>Ingrid CRM</h1>
          <p>Gestão imobiliária</p>
        </div>

        <nav>
          <button className="active">Dashboard</button>
          <button>Leads</button>
          <button>Funil de vendas</button>
          <button>Agenda</button>
          <button>Empreendimentos</button>
          <button>Relatórios</button>
        </nav>

        <div className="profile">
          <strong>Ingrid Souza</strong>
          <span>Consultora de imóveis</span>
        </div>
      </aside>

      <main className="content">
        <header>
          <div>
            <h2>Olá, Ingrid 👋</h2>
            <p>Acompanhe seus leads e suas oportunidades.</p>
          </div>

          <button className="new-lead">+ Novo lead</button>
        </header>

        <section className="cards">
          <article>
            <span>Leads cadastrados</span>
            <strong>28</strong>
            <small>+6 nesta semana</small>
          </article>

          <article>
            <span>Em atendimento</span>
            <strong>12</strong>
            <small>Clientes ativos</small>
          </article>

          <article>
            <span>Visitas agendadas</span>
            <strong>5</strong>
            <small>Próximos 7 dias</small>
          </article>

          <article>
            <span>Vendas no mês</span>
            <strong>3</strong>
            <small>Meta: 5 vendas</small>
          </article>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3>Leads recentes</h3>
              <p>Últimos contatos cadastrados no sistema</p>
            </div>

            <button>Ver todos</button>
          </div>

          <div className="table">
            <div className="table-row table-title">
              <span>Cliente</span>
              <span>Origem</span>
              <span>Status</span>
            </div>

            {leads.map((lead) => (
              <div className="table-row" key={lead.nome}>
                <strong>{lead.nome}</strong>
                <span>{lead.origem}</span>
                <span className="status">{lead.status}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
