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
}
