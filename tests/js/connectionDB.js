const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lc_sistemas'
});

connection.connect(err => {
    if (err) {
        console.error("erro ao conectar ao banco de dados: ", err);
        return;
    }

    console.log("conexão bem-sucedida com o MySQL!");
});

const querySQL = 'SELECT * FROM produto WHERE id = 100001;';

connection.query(querySQL, (error, results) => {
    if (error) {
        console.error("Erro na consulta: ", error);
        return;
    }

    for(const result of results) console.log(result);
});

connection.end(err => {
    if (err) {
        console.error("Erro ao fechar a conexão: ", err);
        return;
    }

    console.log("conexão com o MySQL fechada");
});