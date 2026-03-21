import express from 'express';


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