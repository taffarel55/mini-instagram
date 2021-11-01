const express = require("express");
const usuarios = require("./controladores/usuarios");
const login = require("./controladores/login");
const verificaLogin = require("./filtros/verificaLogin");
const postagens = require("./controladores/postagens");
const uploads = require("./controladores/uploads");

const rotas = express();

// cadastro de usuario
rotas.post("/cadastro", usuarios.cadastrarUsuario);

// login
rotas.post("/login", login);

rotas.post("/upload", uploads.upload)

// filtro para verificar usuario logado
rotas.use(verificaLogin);

// obter e atualizar perfil do usuario
rotas.get("/perfil", usuarios.obterPerfil);
rotas.patch("/perfil", usuarios.atualizarPerfil);

// postagens
rotas.post("/postagens", postagens.novaPostagem);
rotas.get("/postagens", postagens.feed);
rotas.post("/postagens/:postagemId/curtir", postagens.curtir);
rotas.post("/postagens/:postagemId/comentar", postagens.comentar);

module.exports = rotas;
