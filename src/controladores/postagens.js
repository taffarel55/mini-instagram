const knex = require("../conexao");

const novaPostagem = async (req, res) => {
  const { id } = req.usuario;
  const { texto, fotos } = req.body;

  if (!fotos || fotos.length === 0) {
    return res.status(400).json("É preciso enviar ao menos uma foto");
  }

  try {
    const postagem = await knex("postagens")
      .insert({ texto, usuario_id: id })
      .returning("*");

    if (!postagem) {
      return res.status(400).json("Não foi possível cadastrar postagem");
    }

    for (const foto of fotos) {
      foto.postagem_id = postagem[0].id;
    }

    const fotosCadastradas = await knex("postagem_fotos").insert(fotos);

    if (!fotosCadastradas) {
      await knex("postagens").where({ id: postagem[0].id }).del();
      return res.status(400).json("Não foi possível cadastrar postagem");
    }

    return res.status(201).json({ id: postagem[0].id });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const curtir = async (req, res) => {
  const { id } = req.usuario;
  const { postagemId } = req.params;

  try {
    const postagem = await knex("postagens").where({ id: postagemId }).first();

    if (!postagem) {
      return res.status(404).json("Não foi possível encontrar postagem");
    }

    const jaCurtiu = await knex("postagem_curtidas")
      .where({
        usuario_id: id,
        postagem_id: postagem.id,
      })
      .first();

    if (jaCurtiu) {
      return res.status(400).json("O usuario já curtiu essa postagem");
    }

    const curtida = await knex("postagem_curtidas").insert({
      usuario_id: id,
      postagem_id: postagemId,
    });

    if (!curtida) {
      return res.status(400).json("Não foi possível curtir a postagem");
    }
    res.status(202).json();
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const comentar = async (req, res) => {
  const { id } = req.usuario;
  const { postagemId } = req.params;
  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json("Para comentar é preciso informar o texto");
  }

  try {
    const postagem = await knex("postagens").where({ id: postagemId });

    if (!postagem) {
      return res.status(404).json("Não foi possível encontrar postagem");
    }

    const comentario = await knex("postagem_comentarios").insert({
      texto,
      usuario_id: id,
      postagem_id: postagemId,
    });

    if (!comentario) {
      return res.status(400).json("Não foi possível comentar nessa postagem");
    }

    res.status(202).json();
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const feed = async (req, res) => {
  const { id } = req.usuario;
  const { offset } = req.query;

  const o = offset ? offset : 0;

  try {
    const postagens = await knex("postagens")
      .where("usuario_id", "!=", id)
      .limit(10)
      .offset(o);
    if (postagens.length === 0) {
      return res.status(200).json(postagens);
    }

    for (const postagem of postagens) {
      // usuario
      const usuario = await knex("usuarios")
        .where({ id: postagem.usuario_id })
        .select("img", "username", "verificado");
      postagem.usuario = usuario;

      // fotos
      const fotos = await knex("postagem_fotos")
        .where({ postagem_id: postagem.id })
        .select("imagem");
      postagem.fotos = fotos;

      // curtidas
      const curtidas = await knex("postagem_curtidas")
        .where({ postagem_id: postagem.id })
        .select("usuario_id");
      postagem.curtidas = curtidas.length;

      // curtido por mim
      postagem.liked = curtidas.find((curtida) => curtida.usuario_id === id)
        ? true
        : false;

      // comentarios
      const comentarios = await knex("postagem_comentarios")
        .leftJoin("usuarios", "usuarios.id", "postagem_comentarios.usuario_id")
        .where({ postagem_id: postagem.id })
        .select(
          "postagem_comentarios.texto",
          "postagem_comentarios.data",
          "usuarios.username"
        );
      postagem.comentarios = comentarios;
    }
    return res.status(200).json(postagens);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = { novaPostagem, curtir, comentar, feed };
