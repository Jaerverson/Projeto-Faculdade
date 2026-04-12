import express from 'express';
import sql from 'mssql';
import fs from 'fs';


//aprendendo a usar o express, criei um servidor básico.
const app = express();
app.use(express.json());

const livros = JSON.parse(fs.readFileSync('livros.json', 'utf-8'));
const PORT = 3000;


app.use(express.static('Front/src'));

// Rota de teste para verificar se o servidor está funcionando
app.get('/users', (req, res) => {

    res.send('oK, DEU CERTO');

});

// Rotas para CRUD de livros

// Rota para exibir a lista de livros
app.get("/livros", (req, res) => {
 
  res.status(200).json(livros);
  
});

// Rota para buscar um livro por id
app.get("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  if (index === -1) {
    res.status(404).json("Livro não encontrado");
  } else {
    res.status(200).json(livros[index]);
  }
});

// Rota para criar um novo livro
app.post('/livros', (req, res) => {
  const { title, author } = req.body;

  // validação básica
  if (!title || !author) {
    return res.status(400).json({
      erro: "Title e author são obrigatórios"
    });
  }

  // simulando ID automático
  const novoLivro = {
    id: livros.length > 0 
    ? livros[livros.length - 1].id + 1 
    : 1,
   title,
   author
  };

  livros.push(novoLivro);

  res.status(201).json({
    mensagem: "Livro adicionado com sucesso",
    livro: novoLivro
  });
});

// Rota para atualizar um livro existente
app.put("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  if (index === -1) {
    return res.status(404).json({erro:"Livro não encontrado para atualizar"});
  } else {
    livros[index].title = req.body.title;
    livros[index].author = req.body.author;
    res.status(200).json(livros[index]);
  }
});

// Rota para deletar um livro
app.delete("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  if (index === -1) {
    res.status(404).json("Livro não encontrado para remover");
  } else {
    livros.splice(index, 1);
    res.status(200).send("Livro removido com sucesso");
  }
});

function buscaLivro(id) {
  return livros.findIndex(livro => livro.id == id);
}



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});