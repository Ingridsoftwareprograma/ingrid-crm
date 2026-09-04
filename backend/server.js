const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./src/config/database");
const clienteRoutes = require("./src/routes/clienteRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/clientes", clienteRoutes);

// Rota principal
app.get("/", (req, res) => {
  res.json({
    message: "API do Ingrid CRM funcionando!",
    status: "online",
  });
});

// Teste de conexão com PostgreSQL
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "Conexão com PostgreSQL funcionando!",
      horarioBanco: result.rows[0].now,
    });
  } catch (error) {
    console.error("Erro ao conectar com PostgreSQL:", error);

    res.status(500).json({
      message: "Erro ao conectar com PostgreSQL",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor Ingrid CRM rodando na porta ${PORT}`);
});