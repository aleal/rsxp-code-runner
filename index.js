"use strict";
//serverless create --template google-nodejs --path api-serverless
exports.http = (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      const { resposta, esperado, tipo } = req.body;
      try {
        const resultadoUser = tipo == "code" ? eval(resposta) : resposta;
        res.status(200).send({
          correto: resultadoUser == esperado,
          esperado,
          resultadoUser
        });
      } catch (e) {
        res
          .status(500)
          .send({ correto: false, esperado, erro: "Codigo não rodou : (" });
      }
      break;
    default:
      res.status(200).send("Unknown!!");
  }
};

exports.event = (event, callback) => {
  callback();
};
