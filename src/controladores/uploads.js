const aws = require("../servicos/aws");

const upload = async (req, res) => {
  const { imagem, nome } = req.body;

  const buffer = new Buffer.from(imagem, "base64");

  try {
    await aws.enviarImagem(nome, buffer);
    return res.status(200).json(nome);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = { upload };
