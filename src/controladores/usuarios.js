const knex = require("../conexao");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res, next) => {
  const { username, senha } = req.body;

  if (!username || !senha) {
    return res.status(404).json("Obrigatório usuário e senha");
  }

  if (senha.length < 5) {
    return res.status(403).json("A senha deve conter no míinimo 5 caracteres");
  }

  try {
    const quantidadeUsuarios = await knex("usuarios")
      .where({ username })
      .first();

    if (quantidadeUsuarios) {
      return res.status(409).json("Usuário já existe");
    }
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await knex("usuarios").insert({
      username,
      senha: senhaCriptografada,
    });

    if (!usuario) {
      return res.status(400).json("Usuário não foi cadastrado");
    }

    return res.status(201).json();
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const obterPerfil = async (req, res) => {
  return res.status(200).json(req.usuario);
};

const atualizarPerfil = async (req, res) => {
  let { nome, email, senha, img, username, site, bio, tel, gender } = req.body;
  const { id } = req.usuario;

  if (
    !nome &&
    !email &&
    !senha &&
    !img &&
    !username &&
    !site &&
    !bio &&
    !tel &&
    !gender
  ) {
    return res.status(400).json("Informe ao menos um campo para atualização");
  }

  try {
    if (senha) {
      if (senha.length < 5) {
        return res
          .status(403)
          .json("A senha deve conter no míinimo 5 caracteres");
      }
      senha = await bcrypt.hash(senha, 10);
    }

    if (email !== req.usuario.email) {
      const emailUsuarioExiste = await knex("usuarios")
        .where({ email })
        .first();

      if (emailUsuarioExiste) {
        return res.status(409).json("O email já existe");
      }
    }

    if (username !== req.usuario.username) {
      const usernameUsuarioExiste = await knex("usuarios")
        .where({ username })
        .first();
      if (usernameUsuarioExiste) {
        return res.status(409).json("O usuário já existe");
      }
    }

    const usuarioAtualizado = await knex("usuarios").where({ id }).update({
      nome,
      email,
      senha,
      img,
      username,
      site,
      bio,
      tel,
      gender,
    });

    if (!usuarioAtualizado) {
      return res.status(400).json("Não foi possível atualizar cadasttro");
    }

    return res.status(202).json();
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = { cadastrarUsuario, obterPerfil, atualizarPerfil };
