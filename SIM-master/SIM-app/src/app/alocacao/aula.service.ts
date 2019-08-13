import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';
//import 'rxjs/add/operator/toPromise';

import { Aula } from './aula';

@Injectable()
export class AulaService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private simURL = 'http://localhost:3000';
  constructor(private http: Http) { }
  criar(aula: Aula): Promise<Aula> {
    return this.http.post(this.simURL + "/aula",JSON.stringify(aula), {headers: this.headers})
           .toPromise()
           .then(res => {
              if (res.json().success) {return aula;} else {return null;}
           })
           .catch(this.tratarErro);
  }
  atualizar(aula: Aula): Promise<Aula> {
    return this.http.put(this.simURL + "/aula",JSON.stringify(aula), {headers: this.headers})
         .toPromise()
         .then(res => {
            if (res.json().success) {return aula;} else {return null;}
         })
         .catch(this.tratarErro);
  }

  getAulas() : Promise<Aula[]>{
    return this.http.get(this.simURL + "/aulas")
            .toPromise()
            .then(res => res.json() as Aula[])
            .catch(this.tratarErro);
  }
  private tratarErro(erro: any): Promise<any>{
    console.error('Acesso mal sucedido ao serviço de aulas',erro);
    return Promise.reject(erro.message || erro);
  }
}
