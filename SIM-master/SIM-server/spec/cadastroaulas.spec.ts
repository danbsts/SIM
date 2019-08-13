import { CadastroAulas } from '../cadastroaulas';
import {Aula} from '../../SIM-app/src/app/alocacao/aula';
import 'jasmine';

describe("O cadastro de alunos", () => {
  var cadastro: CadastroAulas;

  beforeEach(() => cadastro = new CadastroAulas())

  it("é inicialmente vazio", () => {
    expect(cadastro.getAulas().length).toBe(0);
  })

  it("Cadastra Aula", () => {
    var aula: Aula = new Aula();
    aula.data = "27/06";
    aula.diaSemana = "segunda-feira";
    aula.hora = "8:00";
    aula.monitores = [];
    aula.numAlocados = 0;
    aula.soChefe = false;
    aula.tipo = "Assunto novo";
    cadastro.criar(aula);

    expect(cadastro.getAulas().length).toBe(1);
    aula = cadastro.getAulas()[0];
    expect(aula.data).toBe("27/06");
    expect(aula.diaSemana).toBe("segunda-feira");
    expect(aula.hora).toBe("8:00");
    expect(aula.monitores.length).toBe(0);
    expect(aula.numAlocados).toBe(0);
    expect(aula.soChefe).toBe(false);
    expect(aula.tipo).toBe("Assunto novo");
  })
})
