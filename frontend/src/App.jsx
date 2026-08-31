import { useState } from "react";
import "./App.css";

const leadsIniciais = [
  {
    id: 1,
    nome: "Maria Silva",
    telefone: "(11) 99999-1111",
    origem: "Instagram",
    status: "Novo lead",
  },
  {
    id: 2,
    nome: "João Santos",
    telefone: "(11) 99999-2222",
    origem: "WhatsApp",
    status: "Em atendimento",
  },
  {
    id: 3,
    nome: "Fernanda Lima",
    telefone: "(11) 99999-3333",
    origem: "Facebook",
    status: "Simulação enviada",
  },
  {
    id: 4,
    nome: "Carlos Souza",
    telefone: "(11) 99999-4444",
    origem: "Indicação",
    status: "Visita marcada",
  },
];

const formularioInicial = {
  nome: "",
  telefone: "",
  origem: "Instagram",
  status: "Novo lead",
};

function App() {
  const [leads, setLeads] = useState(leadsIniciais);
  const [modalAberto, setModalAberto] = useState(false);
  const [formulario, setFormulario] = useState(formularioInicial);

  function atualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  function cadastrarLead(evento) {
    evento.preventDefault();

    if (!formulario.nome.trim() || !formulario.telefone.trim()) {
      alert("Preencha o nome e o telefone do cliente.");
      return;
    }

    const novoLead = {
      id: Date.now(),
      nome: formulario.nome.trim(),
      telefone: formulario.telefone.trim(),
      origem: formulario.origem,
      status: formulario.status,
    };

    setLeads((listaAtual) => [novoLead, ...listaAtual]);
    setFormulario(formularioInicial);
    setModalAberto(false);
  }

  function fecharModal() {
    setModalAberto(false);
    setFormulario(formularioInicial);
  }

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

          <button
            className="new-lead"
            onClick={() => setModalAberto(true)}
          >
            + Novo lead
          </button>
        </header>

        <section className="cards">
          <article>
            <span>Leads cadastrados</span>
            <strong>{leads.length}</strong>
            <small>Total no sistema</small>
          </article>

          <article>
            <span>Em atendimento</span>
            <strong>
              {
                leads.filter(
                  (lead) => lead.status === "Em atendimento"
                ).length
              }
            </strong>
            <small>Clientes ativos</small>
          </article>

          <article>
            <span>Visitas agendadas</span>
            <strong>
              {
                leads.filter(
                  (lead) => lead.status === "Visita marcada"
                ).length
              }
            </strong>
            <small>Visitas registradas</small>
          </article>

          <article>
            <span>Vendas no mês</span>
            <strong>
              {
                leads.filter(
                  (lead) => lead.status === "Venda concluída"
                ).length
              }
            </strong>
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
              <span>Telefone</span>
              <span>Origem</span>
              <span>Status</span>
            </div>

            {leads.map((lead) => (
              <div className="table-row" key={lead.id}>
                <strong>{lead.nome}</strong>
                <span>{lead.telefone}</span>
                <span>{lead.origem}</span>
                <span className="status">{lead.status}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div>
                <h3>Novo lead</h3>
                <p>Cadastre um novo cliente no CRM.</p>
              </div>

              <button
                type="button"
                className="close-button"
                onClick={fecharModal}
              >
                ×
              </button>
            </div>

            <form onSubmit={cadastrarLead}>
              <label>
                Nome do cliente
                <input
                  type="text"
                  name="nome"
                  value={formulario.nome}
                  onChange={atualizarCampo}
                  placeholder="Digite o nome completo"
                />
              </label>

              <label>
                Telefone
                <input
                  type="text"
                  name="telefone"
                  value={formulario.telefone}
                  onChange={atualizarCampo}
                  placeholder="Ex.: (11) 99999-9999"
                />
              </label>

              <label>
                Origem do lead
                <select
                  name="origem"
                  value={formulario.origem}
                  onChange={atualizarCampo}
                >
                  <option>Instagram</option>
                  <option>Facebook</option>
                  <option>WhatsApp</option>
                  <option>TikTok</option>
                  <option>Indicação</option>
                  <option>Site</option>
                </select>
              </label>

              <label>
                Status
                <select
                  name="status"
                  value={formulario.status}
                  onChange={atualizarCampo}
                >
                  <option>Novo lead</option>
                  <option>Em atendimento</option>
                  <option>Simulação enviada</option>
                  <option>Visita marcada</option>
                  <option>Venda concluída</option>
                  <option>Perdido</option>
                </select>
              </label>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={fecharModal}
                >
                  Cancelar
                </button>

                <button type="submit" className="save-button">
                  Salvar lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;