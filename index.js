const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');
const port = 8080;
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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

            Resposta.findAll({ 

                where: {pergunta_id:id},
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas =>{

                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });

            });

           
        }else{
            res.redirect("/");
        } 
    })

})

app.post('/responder', (req, res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        pergunta_id: perguntaId
    }).then(()=>{
        console.log("resposta adicionada com sucesso");
        res.redirect(`/pergunta/${perguntaId}`);
    });
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});