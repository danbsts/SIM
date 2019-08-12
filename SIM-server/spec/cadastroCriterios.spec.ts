import { CadastroCriterios } from '../cadastroCriterios';
import { Criterio } from '../../SIM-app/src/app/criterios/criterio';

describe("O cadastro de criterios", () => {
  var cadastro: CadastroCriterios;

  beforeEach(() => cadastro = new CadastroCriterios())

  it("Não remove criterios não cadastrados", () => {
    expect(cadastro.getCriterios().length).toBe(0);
    var criterio: Criterio = new Criterio();
    criterio.nome = "Uso de pacotes";
    criterio.peso = 1;
    cadastro.criar(criterio);
    expect(cadastro.getCriterios().length).toBe(1);
    var criterio2: Criterio = new Criterio();
    criterio2.nome = "Uso de herança";
    criterio2.peso = 1;
    cadastro.deletar(criterio2);
    expect(cadastro.getCriterios().length).toBe(1);
  })

  it("Atualiza criterios corretamente", () => {
    expect(cadastro.getCriterios().length).toBe(0);
    var criterio: Criterio = new Criterio();
    criterio.nome = "Uso de pacotes";
    criterio.peso = 1;
    cadastro.criar(criterio);
    expect(cadastro.getCriterios().length).toBe(1);
    var criterio2: Criterio = new Criterio();
    criterio2.nome = "Uso de pacotes";
    criterio2.peso = 2;
    cadastro.atualizar(criterio2);
    expect(cadastro.getCriterios().length).toBe(1);
    expect(cadastro.getCriterios()[0].peso).toBe(2);
  })

})
