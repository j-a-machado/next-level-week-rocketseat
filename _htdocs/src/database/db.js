//Importando o sqlite
const sqlite3 = require("sqlite3").verbose();

//Criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

//Utilizar o db nas operações deste projeto
//db.serialize