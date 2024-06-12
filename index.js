const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');
const port = 8080;
const Pergunta = require("./database/Pergunta");

//database
connection.authenticate()
.then(() =>{
    console.log("Conexão feita com o banco de dados");
})
.catch((msgErro)=>{
    console.log(msgErro);
});

//views
app.set("view engine", "ejs");
app.use(express.static("public"));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


//Routes
app.get("/", (req, res) => {

    Pergunta.findAll({ raw: true, order: [
        ['id', 'desc']
    ] }).then(perguntas =>{
        res.render("index",{
            perguntas: perguntas,
        });
    });  
});

app.get("/perguntar", (req, res) => {

    res.render("perguntar");
});

app.post('/salvarpergunta', (req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        description: descricao
    }).then(()=>{
        console.log("usuário criado com sucesso");
        res.redirect("/");
    });
})

app.get('/pergunta/:id', (req, res)=>{
    var id = req.params.id;

    Pergunta.findOne({
        where :{id: id},
        raw: true,
    }).then(pergunta =>{
        if(pergunta != undefined){
            console.log(pergunta)
            res.render("pergunta",{
                pergunta: pergunta,
            });
        }else{
            res.redirect("/");
        } 
    })

})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});