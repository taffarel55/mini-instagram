const AWS = require("aws-sdk");

const spacesEndpoint = new AWS.Endpoint("sfo3.digitaloceanspaces.com");

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET,
});

const enviarImagem = async (nome, imagem) => {
  return await s3
    .putObject({
      Bucket: process.env.SPACES_BUCKET,
      Key: nome,
      Body: imagem,
      ACL: "public-read",
    })
    .promise();
};

const excluirImagem = async (nome) => {
  return await s3
    .deletObject({
      Bucket: process.env.SPACES_BUCKET,
      Key: nome,
    })
    .promise();
};

module.exports = { enviarImagem, excluirImagem };
