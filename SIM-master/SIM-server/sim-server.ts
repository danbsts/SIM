import express = require('express');
import bodyParser = require("body-parser");

import {CadastroAulas} from './cadastroaulas';
import {CadastroMonitores} from './cadastromonitores';
import {Monitor} from '../SIM-app/src/app/alocacao/monitor';
import {Aula} from '../SIM-app/src/app/alocacao/aula';

import fs = require('fs');
var app = express();

var aulas: CadastroAulas = new CadastroAulas();
var monitores: CadastroMonitores = new CadastroMonitores();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

app.get('/aulas', function(req, res){
  res.send(JSON.stringify(aulas.getAulas()));
})
app.get('/monitores', function(req, res){
  res.send(JSON.stringify(monitores.getMonitores()));
})


app.post('/aula', function(req: express.Request, res: express.Response){
  var aula: Aula = <Aula> req.body;
  aula = aulas.criar(aula);
  if (aula) {
    res.send({"success": "A aula foi cadastrada com sucesso"});
  } else {
    res.send({"failure": "A aula não pode ser cadastrada"});
  }
})

app.post('/monitor', function(req: express.Request, res: express.Response){
  var monitor: Monitor = <Monitor> req.body;
  monitor = monitores.criar(monitor);
  if (monitor) {
    res.send({"success": "O monitor foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O monitor não pode ser cadastrado"});
  }
})

app.put('/aula', function (req: express.Request, res: express.Response) {
  var aula: Aula = <Aula> req.body;
  aula = aulas.atualizar(aula);
  if (aula) {
    res.send({"success": "A aula foi atualizada com sucesso"});
  } else {
    res.send({"failure": "A aula não pode ser atualizada"});
  }
})

app.put('/monitor', function (req: express.Request, res: express.Response) {
  var monitor: Monitor = <Monitor> req.body;
  monitor = monitores.atualizar(monitor);
  if (monitor) {
    res.send({"success": "O monitor foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O monitor não pode ser atualizado"});
  }
})

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
  server.close();
}

export { app, server, closeServer }