import express from 'express';


const app = express();  
app.use(express.json());
const PORT = 3000;

app.use(express.static('Front/src'));

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});

app.get('/users', (req, res) => {

    res.send('oK, DEU CERTO');
});




const books = [];

app.post('/books', (req, res) => {
    console.log(req);
    
    
//   {
//         "id": 1,
//         "title": "O Hobbit",
//         "author": "J.R.R. Tolkien",
//         "category": "ficção"
//     }


});
