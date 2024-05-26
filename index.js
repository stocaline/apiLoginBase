const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000

app.use(bodyParser.json())

require("./app/routes/routes")(app)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})