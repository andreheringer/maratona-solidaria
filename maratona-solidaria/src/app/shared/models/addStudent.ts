import { Student } from "./student";
export class AddStudent implements Student {
  public nome: string;
  public matricula: number;
  public curso: string;
  public equipe_id: number;
  public email: string;
  public telefone: string;
  public observacao: string;

  constructor() {
    this.nome = "";
    this.matricula = null;
    this.curso = "";
    this.equipe_id = null;
    this.email = "";
    this.telefone = "";
    this.observacao = "";
  }
}
