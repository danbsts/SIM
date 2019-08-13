import request = require("request-promise");
import 'jasmine';
import { closeServer } from '../sim-server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../sim-server')});

  afterAll(() => {server.closeServer()});

  it("Atualização de monitor", () => {
    return request.post(base_url + "monitor", {"json":{"nome": "Ruy", "disponibilidade":[false,false,false,false,false], "restricoes":[], "alocacoes":"2", "chefe":"false"}}).then(body => {
         expect(body).toEqual({success: "O monitor foi cadastrado com sucesso"});
         return request.put(base_url + "monitor", {"json":{"nome": "Ruy", "disponibilidade":[false,false,false,false,false], "restricoes":[], "alocacoes":"1", "chefe":"false"}}).then(body => {
             expect(body).toEqual({success: "O monitor foi atualizado com sucesso"});
             return request.get(base_url + "monitores").then(body => {
                 expect(body).toContain('[{"nome":"Ruy","disponibilidade":[false,false,false,false,false],"restricoes":[],"alocacoes":"1","chefe":"false"}]');
                 expect(body).not.toContain('[{"nome":"Ruy","disponibilidade":[false,false,false,false,false],"restricoes":[],"alocacoes":"2","chefe":"false"}]');
             });
         });
     });
  });


  it("Atualização de aula", () => {
    return request.post(base_url + "aula", {"json":{"hora": "8:00", "data":"25/03", "diaSemana":"segunda-feira", "numAlocados":"2", "monitores":["Ruy","Daniel"], "soChefe":false}}).then(body => {
         expect(body).toEqual({success: "A aula foi cadastrada com sucesso"});
         return request.put(base_url + "aula", {"json":{"hora": "9:00", "data":"25/03", "diaSemana":"segunda-feira", "numAlocados":"2", "monitores":["Ruy","Daniel"], "soChefe":false}}).then(body => {
             expect(body).toEqual({success: "A aula foi atualizada com sucesso"});
             return request.get(base_url + "aulas").then(body => {
                 expect(body).toContain('[{"hora":"9:00","data":"25/03","diaSemana":"segunda-feira","numAlocados":"2","monitores":["Ruy","Daniel"],"soChefe":false}]');
                 expect(body).not.toContain('[{"hora":"8:00","data":"25/03","diaSemana":"segunda-feira","numAlocados":"2","monitores":["Ruy","Daniel"],"soChefe":false}]');
             });
         });
     });
  });
  

})