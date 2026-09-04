import { useEffect, useState } from "react";
import "./App.css";

const formularioInicial = {
  nome: "",
  email: "",
  telefone: "",
  cpf: "",
  empresa: "",
  status: "Novo lead",
  observacoes: "",
};

function App() {
  const [leads, setLeads] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [clienteEditando, setClienteEditando] = useState(null);

  useEffect(() => {
    async function carregarClientes() {
      try {
        const resposta = await fetch("http://localhost:3001/api/clientes");
        const dados = await resposta.json();

        setLeads(dados);
      } catch (erro) {
        console.error("Erro ao carregar clientes:", erro);
      }
    }

    carregarClientes();
  }, []);

  function atualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  function abrirNovoLead() {
    setClienteEditando(null);
    setFormulario(formularioInicial);
    setModalAberto(true);
  }

  function abrirEdicao(lead) {
    setClienteEditando(lead);

    setFormulario({
      nome: lead.nome || "",
      email: lead.email || "",
      telefone: lead.telefone || "",
      cpf: lead.cpf || "",
      empresa: lead.empresa || "",
      status: lead.status || "Novo lead",
      observacoes: lead.observacoes || "",
    });

    setModalAberto(true);
  }

  async function salvarLead(evento) {
    evento.preventDefault();

    if (!formulario.nome.trim() || !formulario.telefone.trim()) {
      alert("Preencha o nome e o telefone do cliente.");
      return;
    }

    const dadosFormulario = {
      nome: formulario.nome.trim(),
      email: formulario.email.trim(),
      telefone: formulario.telefone.trim(),
      cpf: formulario.cpf.trim(),
      empresa: formulario.empresa.trim(),
      status: formulario.status,
      observacoes: formulario.observacoes.trim(),
    };

    try {
      if (clienteEditando) {
        const resposta = await fetch(
          `http://localhost:3001/api/clientes/${clienteEditando.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosFormulario),
          }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
          alert(
            dados.erro ||
              dados.mensagem ||
              "Erro ao atualizar cliente."
          );
          return;
        }

        setLeads((listaAtual) =>
          listaAtual.map((lead) =>
            lead.id === clienteEditando.id
              ? dados.cliente
              : lead
          )
        );

        alert("Cliente atualizado com sucesso!");
      } else {
        const resposta = await fetch(
          "http://localhost:3001/api/clientes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosFormulario),
          }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
          alert(
            dados.erro ||
              dados.mensagem ||
              "Erro ao cadastrar cliente."
          );
          return;
        }

        setLeads((listaAtual) => [
          dados.cliente,
          ...listaAtual,
        ]);

        alert("Cliente cadastrado com sucesso!");
      }

      setFormulario(formularioInicial);
      setClienteEditando(null);
      setModalAberto(false);
    } catch (erro) {
      console.error("Erro ao salvar cliente:", erro);
      alert("Não foi possível salvar o cliente.");
    }
  }

  async function excluirLead(id, nome) {
    const confirmar = window.confirm(
      `Tem certeza que deseja excluir o cliente "${nome}"?`
    );

    if (!confirmar) {
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:3001/api/clientes/${id}`,
        {
          method: "DELETE",
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(
          dados.erro ||
            dados.mensagem ||
            "Erro ao excluir cliente."
        );
        return;
      }

      setLeads((listaAtual) =>
        listaAtual.filter((lead) => lead.id !== id)
      );

      alert("Cliente excluído com sucesso!");
    } catch (erro) {
      console.error("Erro ao excluir cliente:", erro);
      alert("Não foi possível excluir o cliente.");
    }
  }

  function fecharModal() {
    setModalAberto(false);
    setFormulario(formularioInicial);
    setClienteEditando(null);
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
            onClick={abrirNovoLead}
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
                  (lead) =>
                    lead.status === "Em atendimento"
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
                  (lead) =>
                    lead.status === "Visita marcada"
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
                  (lead) =>
                    lead.status === "Venda concluída"
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
              <p>
                Últimos contatos cadastrados no sistema
              </p>
            </div>

            <button>Ver todos</button>
          </div>

          <div className="table">
            <div className="table-row table-title">
              <span>Cliente</span>
              <span>E-mail</span>
              <span>Telefone</span>
              <span>Empresa</span>
              <span>Status</span>
              <span>Ações</span>
            </div>

            {leads.map((lead) => (
              <div
                className="table-row"
                key={lead.id}
              >
                <strong>{lead.nome}</strong>
                <span>{lead.email || "-"}</span>
                <span>{lead.telefone || "-"}</span>
                <span>{lead.empresa || "-"}</span>
                <span className="status">
                  {lead.status}
                </span>

                <div className="actions">
                  <button
                    type="button"
                    onClick={() => abrirEdicao(lead)}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      excluirLead(
                        lead.id,
                        lead.nome
                      )
                    }
                  >
                    Excluir
                  </button>
                </div>
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
                <h3>
                  {clienteEditando
                    ? "Editar lead"
                    : "Novo lead"}
                </h3>

                <p>
                  {clienteEditando
                    ? "Atualize os dados do cliente."
                    : "Cadastre um novo cliente no CRM."}
                </p>
              </div>

              <button
                type="button"
                className="close-button"
                onClick={fecharModal}
              >
                ×
              </button>
            </div>

            <form onSubmit={salvarLead}>
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
                E-mail
                <input
                  type="email"
                  name="email"
                  value={formulario.email}
                  onChange={atualizarCampo}
                  placeholder="cliente@email.com"
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
                CPF
                <input
                  type="text"
                  name="cpf"
                  value={formulario.cpf}
                  onChange={atualizarCampo}
                  placeholder="000.000.000-00"
                />
              </label>

              <label>
                Empresa
                <input
                  type="text"
                  name="empresa"
                  value={formulario.empresa}
                  onChange={atualizarCampo}
                  placeholder="Nome da empresa"
                />
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

              <label>
                Observações
                <textarea
                  name="observacoes"
                  value={formulario.observacoes}
                  onChange={atualizarCampo}
                  placeholder="Digite informações importantes sobre o cliente"
                  rows="4"
                />
              </label>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={fecharModal}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="save-button"
                >
                  {clienteEditando
                    ? "Salvar alterações"
                    : "Salvar lead"}
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