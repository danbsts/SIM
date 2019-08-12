import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Criterio } from './criterio';

@Injectable()
export class CriteriosService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private simURL = 'http://localhost:3000';

  constructor(private http: Http) { }

  criar(criterio : Criterio): Promise<Criterio> {
    return this.http.post(this.simURL + "/criterio",JSON.stringify(criterio), {headers: this.headers})
           .toPromise()
           .then(res => {
              if (res.json().success) {return criterio;} else {return null;}
           })
           .catch(this.tratarErro);
  }

  deletar(criterio : Criterio): Promise<Criterio> {
  return this.http.delete(this.simURL + "/deletarCriterio", {headers: this.headers, body: JSON.stringify(criterio)})
    .toPromise()
    .then(res => {
      if (res.json().success) {return criterio;} else {return null;}
    })
    .catch(this.tratarErro);
  }

  atualizar(criterio: Criterio): Promise<Criterio> {
    return this.http.put(this.simURL + "/criterio",JSON.stringify(criterio), {headers: this.headers})
         .toPromise()
         .then(res => {
            if (res.json().success) {return criterio;} else {return null;}
         })
         .catch(this.tratarErro);
  }

  getCriterios(): Promise<Criterio[]> {
    return this.http.get(this.simURL + "/criterio")
             .toPromise()
             .then(res => res.json() as Criterio[])
             .catch(this.tratarErro);
  }

  private tratarErro(erro: any): Promise<any>{
    console.error('Acesso mal sucedido ao serviço de criterios',erro);
    return Promise.reject(erro.message || erro);
  }
}