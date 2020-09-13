import { Student } from './student';
import { Team, TEAMS } from './team';
export class AddStudent implements Student {
  public nome: string;
  public matricula: number;
  public curso: Team;
  public email: string;
  public telefone: string;
  public observacao: string;

  constructor() {
    this.nome = '';
    this.matricula = null;
    this.email = '';
    this.curso = TEAMS[0];
    this.telefone = '';
    this.observacao = '';
  }

  public static getMockStudent(): AddStudent {
    let mock = new AddStudent();
    mock.nome = 'Name LastName';
    mock.matricula = null;
    mock.email = '';
    mock.curso = TEAMS[0];
    mock.telefone = '';
    mock.observacao = '';
    return mock;
  }
}
