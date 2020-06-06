//Importando o sqlite
const sqlite3 = require("sqlite3").verbose();

//Criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

//Utilizar o db nas operações deste projeto
db.serialize(() => {
    //Usando comandos SQL para...

    //Criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            //Colunas que terá na tabela places
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //Inserir dados na tabela
    

    //Consultar dados na tabela

    //Excluir dados da tabela
});