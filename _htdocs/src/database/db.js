//Importando o sqlite
const sqlite3 = require("sqlite3").verbose();

//Criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("src/database/database.db");

//Utilizar o db nas operações deste projeto
db.serialize(() => {
    //Usando comandos SQL para...

    //Criar uma tabela
    db.run(`CREATE TABLE IF NOT EXISTS places (
                //Colunas que terá na tabela places
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT,
                name TEXT,
                address TEXT,
                address2 TEXT,
                state TEXT,
                city TEXT,
                items TEXT
            );`);

    //Inserir dados na tabela
    const query = `INSERT INTO places(
                        image,
                        name,
                        address,
                        address2,
                        state,
                        city,
                        items
                    ) VALUES (?,?,?,?,?,?,?)`;
    const values = [
                    "https://www.visitmonaco.com/ImageRepository/Article/c563a9e8-9c0c-454f-8168-18959529e3f8/Slider/3-banniere-shutterstock-709345111.jpg?Width=1700&Height=850",
                    "Colectoria",
                    "Guilherme Gemballa, Jardim América",
                    "260",
                    "Santa Catarina",
                    "Rio Do Sul",
                    "Resíduos Eletrônicos e Lâmpadas"];
    function depoisDeInserirDados(err) {
        if(err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso!");
        console.log(this);
    }
    db.run(query, values, depoisDeInserirDados)

    //Consultar dados na tabela

    //Excluir dados da tabela
});