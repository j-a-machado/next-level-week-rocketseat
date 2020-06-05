//Função que cria um servidor
const express = require("express");

//Ativa a função que cria um servidor
const server = express();

//Caminho para a pasta publica
server.use(express.static("_public"));

//Função pra ativar o template engine nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("src/_views", {
    express: server,
    noCache: true
});

// --Configurar caminhos da aplicação--

//Home
server.get("/", (req, res) => {
    return res.render("index.html")
    }
);
//Cadastro de ponto de coleta
server.get("/cadastro", (req, res) => {
    return res.render("cadastro.html")
    }
);
//Resultado da pesquisa de pontos de coleta
server.get("/resultado-pesquisa", (req, res) => {
    return res.render("resultado-pesquisa.html")
    }
);

//Liga o servidor
server.listen(3000);