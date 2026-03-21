import express from 'express';
import sql from 'mssql';

const config = {
    user: 'livros',
    password: 'senha123',
    server: 'localhost',
    database: 'bancoDeLivros',
    options: {
        encrypt: false, // true se for Azure
        trustServerCertificate: true
    }
};

export async function connectDB() {
    try {
        await sql.connect(config);
        console.log('Conectado ao SQL Server');
    } catch (err) {
        console.error('Erro ao conectar:', err);
    }
}











const app = express();  
app.use(express.json());
const PORT = 3000;

app.use(express.static('Front/src'));

app.get('/users', (req, res) => {

    res.send('oK, DEU CERTO');

});





app.get('/books', (req, res) => {
    console.log("teste");
    
    
//   {
//         "id": 1,
//         "title": "O Hobbit",
//         "author": "J.R.R. Tolkien",
//         "category": "ficção"
//     }


});










app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});