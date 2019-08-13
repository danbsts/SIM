import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';


import { Monitor } from './monitor';

@Injectable()
export class MonitorService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private simURL = 'http://localhost:3000';

    constructor(private http: Http) { }

	criar(monitor: Monitor): Promise<Monitor> {
		return this.http.post(this.simURL + "/monitor",JSON.stringify(monitor), {headers: this.headers})
			.toPromise()
			.then(res => {
				if (res.json().success) {return monitor;} else {alert(res.json().failure); return null;}
			})
			.catch(this.tratarErro);
	}

	atualizar(monitor: Monitor): Promise<Monitor> {
		return this.http.put(this.simURL + "/monitor",JSON.stringify(monitor), {headers: this.headers})
			.toPromise()
			.then(res => {
			if (res.json().success) {return monitor;} else {return null;}
			})
			.catch(this.tratarErro);
	}

	getMonitores(): Promise<Monitor[]> {
		return this.http.get(this.simURL + "/monitores")
			.toPromise()
			.then(res => res.json() as Monitor[])
			.catch(this.tratarErro);
	}

	private tratarErro(erro: any): Promise<any>{
		console.error('Acesso mal sucedido ao serviço de monitor',erro);
		return Promise.reject(erro.message || erro);
	}
}