const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const aluno = require("./models/Alunos");
const falta = require("./models/Faltas");
const path = require('path');

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Page principal: 
app.use(express.static(path.join(__dirname,'../Front')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front', 'index.html'));
});

//Rota Cadastrar Aluno
app.get('/cadAluno', function(req, res){
    res.render("cadAluno");
});

app.post('/cadastro', function(req, res){
    
    aluno.create({
        name: req.body.nome,
        turma: req.body.turma,
        faltas: req.body.faltas,
        responsavel_nome: req.body.responsavel_nome,
        responsavel_email: req.body.responsavel_email
    })

    const success = true;
    const message = success ? 'Cadastro efetuado com sucesso!' : 'Erro ao cadastrar. Tente novamente.';

    res.json({ success, message });
});

//Rota Cadastrar Faltas

app.get('/cadFaltas', function(req, res){
    res.render("cadFaltas");
});

app.post('/cadastro-faltas', function(req, res){
    falta.create({
        name: req.body.nome,
        turma: req.body.turma,
        faltas: req.body.faltas,
    })
});

//Rota para Listar
app.get('/listarFaltas', function(req, res){
    aluno.findAll({order: [['faltas', 'DESC']]}).then(function(alunos){
        res.render('listarFaltas', {relatorio: alunos});
    })    
});


app.listen(8080);