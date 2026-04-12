import express from 'express';
import sql from 'mssql';
import fs from 'fs';


//aprendendo a usar o express, criei um servidor básico.
const app = express();  
const PORT = 3000;

app.use(express.json());


app.use(express.static('Front/src'));

app.get('/users', (req, res) => {

    res.send('oK, DEU CERTO');

});

app.get("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  if (index === -1) {
    res.status(404).send("Livro não encontrado");
  } else {
    res.status(200).json(livros[index]);
  }
});


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
    id: Date.now(),
    title,
    author
  };

  books.push(novoLivro);

  res.status(201).json({
    mensagem: "Livro adicionado com sucesso",
    livro: novoLivro
  });
});

app.put("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  if (index === -1) {
    res.status(404).send("Livro não encontrado para atualizar");
  } else {
    livros[index].titulo = req.body.titulo;
    livros[index].autor = req.body.autor;
    res.status(200).json(livros[index]);
  }
});

app.delete("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  if (index === -1) {
    res.status(404).send("Livro não encontrado para remover");
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