const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;


app.set("view engine", "ejs");
app.use(express.static("public"));
//Body Parser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {

    res.render("perguntar");
});

app.post('/salvarpergunta', (req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("titulo: " + titulo + " Descrição: " + descricao);
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});