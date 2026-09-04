const pool = require("../config/database");

// CADASTRAR CLIENTE
const criarCliente = async (req, res) => {
  try {
    const {
      nome,
      email,
      telefone,
      cpf,
      empresa,
      status,
      observacoes
    } = req.body;

    if (!nome) {
      return res.status(400).json({
        erro: "O nome do cliente é obrigatório."
      });
    }

    const novoCliente = await pool.query(
      `INSERT INTO clientes
        (nome, email, telefone, cpf, empresa, status, observacoes)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        nome,
        email || null,
        telefone || null,
        cpf || null,
        empresa || null,
        status || "ativo",
        observacoes || null
      ]
    );

    return res.status(201).json({
      mensagem: "Cliente cadastrado com sucesso!",
      cliente: novoCliente.rows[0]
    });

  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        erro: "Já existe um cliente com este e-mail ou CPF."
      });
    }

    return res.status(500).json({
      erro: "Erro interno ao cadastrar cliente."
    });
  }
};

// LISTAR CLIENTES
const listarClientes = async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM clientes ORDER BY id DESC"
    );

    return res.status(200).json(resultado.rows);

  } catch (error) {
    console.error("Erro ao listar clientes:", error);

    return res.status(500).json({
      erro: "Erro interno ao buscar clientes."
    });
  }
};

// EDITAR CLIENTE
const editarCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nome,
      email,
      telefone,
      cpf,
      empresa,
      status,
      observacoes
    } = req.body;

    if (!nome) {
      return res.status(400).json({
        erro: "O nome do cliente é obrigatório."
      });
    }

    const resultado = await pool.query(
      `UPDATE clientes
       SET
         nome = $1,
         email = $2,
         telefone = $3,
         cpf = $4,
         empresa = $5,
         status = $6,
         observacoes = $7,
         atualizado_em = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
      [
        nome,
        email || null,
        telefone || null,
        cpf || null,
        empresa || null,
        status || "ativo",
        observacoes || null,
        id
      ]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Cliente não encontrado."
      });
    }

    return res.status(200).json({
      mensagem: "Cliente atualizado com sucesso!",
      cliente: resultado.rows[0]
    });

  } catch (error) {
    console.error("Erro ao editar cliente:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        erro: "Já existe outro cliente com este e-mail ou CPF."
      });
    }

    return res.status(500).json({
      erro: "Erro interno ao editar cliente."
    });
  }
};

// EXCLUIR CLIENTE
const excluirCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      "DELETE FROM clientes WHERE id = $1 RETURNING *",
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Cliente não encontrado."
      });
    }

    return res.status(200).json({
      mensagem: "Cliente excluído com sucesso!",
      cliente: resultado.rows[0]
    });

  } catch (error) {
    console.error("Erro ao excluir cliente:", error);

    return res.status(500).json({
      erro: "Erro interno ao excluir cliente."
    });
  }
};

module.exports = {
  criarCliente,
  listarClientes,
  editarCliente,
  excluirCliente
};