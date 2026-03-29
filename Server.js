

import express from 'express';
import sql from 'mssql';
import fs from 'fs';

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


//tentativa de conexão com o banco de dados, não consegui fazer funcionar, mas deixei a função pronta para quando conseguir resolver o problema
export async function connectDB() {
    try {
        await sql.connect(config);
        console.log('Conectado ao SQL Server');
    } catch (err) {
        console.error('Erro ao conectar:', err);
    }
}

//aprendendo a usar o express, criei um servidor básico.

const app = express();  
app.use(express.json());
const PORT = 3000;

app.use(express.static('Front/src'));

app.get('/users', (req, res) => {

    res.send('oK, DEU CERTO');

});

// Utilizando biblioteca fs para ler o arquivo json

//Sobrescrever
// const data ={
//     id : 50,
//     name: 'Livro Exemplo',
//     author: 'Autor Exemplo'
// }

// fs.writeFile('livros.json', JSON.stringify(data, null, 2), 'utf8', (err, result) => {      
//     if (err) {
//         console.error('Erro ao escrever no arquivo:', err);
//         return;
//     }
//     console.log('Sobrescrito atualizado com sucesso!');

// });

//ler/atualizar




//atualiza arquivo json, utilizando a função de leitura e escrita do fs, para ler o arquivo, transformar em objeto, atualizar os dados e depois escrever novamente no arquivo.

const updtfiles = (filePath,updateData, encoding = 'utf8') => {

const dataString = fs.readFileSync(filePath, encoding);
const dataObject = JSON.parse(dataString);
const newDataObject = { ...dataObject, ...updateData };
const newDataString = JSON.stringify(newDataObject, null, 2);
fs.writeFileSync(filePath, newDataString, encoding);


};


const filePath = 'livros.json';
const fileEncoding = 'utf8';


const data = {
    id: 50,
    title: "Novo livro",
    status: "Disponível"
}


updtfiles(filePath, data, fileEncoding);


import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/login', (req, res) => {
    res.sendFile(join(__dirname, 'Front', 'src', 'login.html'));
});
updtfiles(filePath, data, fileEncoding);


app.get('/cadastro', (req, res) => {
    res.sendFile(join(__dirname, 'Front', 'src', 'cadastro.html'));
});











app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});