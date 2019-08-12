import { CadastroAlunos } from '../cadastroalunos';
import { Aluno } from '../../SIM-app/src/app/alunos/aluno';

describe("O cadastro de alunos", () => {
  var cadastro: CadastroAlunos;

  beforeEach(() => cadastro = new CadastroAlunos())

  it("Não remove alunos não cadastrados", () => {
    expect(cadastro.getAlunos().length).toBe(0);
    var aluno: Aluno = new Aluno();
    aluno.nome = "Rodrigo";
    aluno.login = "rap2";
    cadastro.criar(aluno);

    expect(cadastro.getAlunos().length).toBe(1);
    aluno = cadastro.getAlunos()[0];
    var aluno2: Aluno = new Aluno();
    aluno2.nome = "Pedro";
    aluno2.login = "Pedro";

    cadastro.deletar(aluno2);
    expect(cadastro.getAlunos().length).toBe(1);
  })

  it("Atualiza alunos corretamente", () => {
    expect(cadastro.getAlunos().length).toBe(0);
    var aluno: Aluno = new Aluno();
    aluno.nome = "Pedro";
    aluno.login = "rap2";
    cadastro.criar(aluno);

    expect(cadastro.getAlunos().length).toBe(1);
    aluno = cadastro.getAlunos()[0];
    var aluno2: Aluno = new Aluno();
    aluno2.nome = "Rodrigo";
    aluno2.login = "rap2";
    cadastro.atualizar(aluno2);
    expect(cadastro.getAlunos()[0].nome).toBe("Rodrigo");
  })

})
