const port = process.env.PORT || 3000;
const express = require("express");
const rotas = require("./rotas");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(rotas);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
}); 
