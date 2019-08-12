import express = require('express');
import bodyParser = require("body-parser");
import { Aluno } from '../SIM-app/src/app/alunos/aluno';
import {CadastroAlunos} from './cadastroalunos';
import {CadastroCriterios} from './cadastroCriterios';
import { Criterio } from '../SIM-app/src/app/criterios/criterio';

import fs = require('fs');
var app = express();

var cadastro: CadastroAlunos = new CadastroAlunos();
var cadastroCriterios: CadastroCriterios = new CadastroCriterios();
var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

app.get('/alunos', function (req, res) {
  res.send(JSON.stringify(cadastro.getAlunos()));
})

app.get('/criterio', function (req, res) {
  res.send(cadastroCriterios.getCriterios());
})

app.post('/criterio', function (req: express.Request, res: express.Response) {
  var criterio: Criterio = <Criterio> req.body;
  criterio = cadastroCriterios.criar(criterio);
  if (criterio) {
    res.send({"success": "O criterio foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O criterio não pode ser cadastrado"});
  }
})

app.post('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  aluno = cadastro.criar(aluno);
  if (aluno != null) {
    res.send({"success": "O aluno foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser cadastrado"});
  }
})

app.delete('/deletarAluno', function (req: express.Request, res: express.Response){
  var aluno = req.body;
  var removido = cadastro.deletar(aluno);
  if (removido) {
    res.send({"success": "O aluno foi removido com sucesso"});
  } else {
    res.send({"failure": "O aluno foi não pôde ser removido"});
  }
})

app.delete('/deletarCriterio', function (req: express.Request, res: express.Response){
  var criterio = req.body;
  var removido = cadastroCriterios.deletar(criterio);
  if (removido) {
    res.send({"success": "O criterio foi removido com sucesso"});
  } else {
    res.send({"failure": "O criterio foi não pôde ser removido"});
  }
})

app.put('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  aluno = cadastro.atualizar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser atualizado"});
  }
})

app.put('/criterio', function (req: express.Request, res: express.Response) {
  var criterio: Criterio = <Criterio> req.body;
  criterio = cadastroCriterios.atualizar(criterio);
  if (criterio) {
    res.send({"success": "O criterio foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O criterio não pode ser atualizado"});
  }
})

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
   server.close();
}

export { app,server,closeServer }