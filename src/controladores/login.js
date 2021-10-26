const knex = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaHash = require("../senhaHash");

const login = async (req, res) => {
  const { username, senha } = req.body;

  if (!username || !senha) {
    return res.status(404).json("Obrigatório usuário e senha");
  }

  try {
    const usuario = await knex("usuarios").where({ username }).first();

    if (!usuario) {
      return res.status(404).json("Usuário não foi encontrado");
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(404).json("Email e senha não conferem");
    }

    const dadosTokenUsuario = {
      id: usuario.id,
      username: usuario.username,
    };

    const token = jwt.sign(dadosTokenUsuario, senhaHash, { expiresIn: "8h" });

    const { senha: _, ...dadosUsuario } = usuario;

    return res.status(200).json({
      usuario: dadosUsuario,
      token,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = login;
