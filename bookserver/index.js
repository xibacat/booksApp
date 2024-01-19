const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
let app = express();
app.use(bodyParser.json());

//app.use('/public', express.static(__dirname + '/public'));

app.get('/books', (req, res) => {
    let fichero = fs.readFileSync('./books.json');
    let libros = JSON.parse(fichero);
    res.send(libros);
});
/*
app.get('/libros/:title', (req, res) => {
    let fichero = fs.readFileSync('./books.json');
    let libros = JSON.parse(fichero);
    let books = libros.filter(book => book.title == req.params.title);
    if (books != null)
        res.send(books);
    else
        res.send({
            mensajeError: "No book found!"
        });

});

app.post('/libros', (req, res) => {
    try {
        let nuevoLibro = req.body;
        let fichero = fs.readFileSync('./books.json');
        let libros = JSON.parse(fichero);
        libros.push(nuevoLibro);
        fs.writeFileSync('./books.json', JSON.stringify(libros));
        res.send({ ok: true });
    }
    catch (err) {
        res.send({ ok: false });
    }
});
*/

app.listen(8080);