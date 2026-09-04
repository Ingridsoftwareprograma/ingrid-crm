const express = require("express");

const {
  criarCliente,
  listarClientes,
  editarCliente,
  excluirCliente,
} = require("../controllers/clienteController");

const router = express.Router();

router.post("/", criarCliente);

router.get("/", listarClientes);

router.put("/:id", editarCliente);

router.delete("/:id", excluirCliente);

module.exports = router;