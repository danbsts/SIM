export class Criterio{
  nome: string;
  peso: number;

  constructor() {
    this.create();
  }

  create() : void{
  	this.nome = "";
    this.peso = 0;
  }

  copy(): Criterio{
  	var criterio: Criterio = new Criterio();
  	criterio.copyCriterio(this);
  	return criterio;
  }
  
  copyCriterio(from: Criterio){
  	this.nome = from.nome;
  	this.peso = from.peso;
  }
  
}