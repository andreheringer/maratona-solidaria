import { AddStudent } from './addStudent';
import { Donation } from './donation';
import { Student } from './student';
export class SimpleDonation implements Donation {
  public id: number;
  public doacao: string;
  public tipo: number;
  public quantidade: number;
  public representante: Student;
  public pontuacao: number;
  public observacao: string;
  public confirmado: boolean;

  constructor() {
    this.id = null;
    this.doacao = '';
    this.tipo = null;
    this.quantidade = null;
    this.representante = {
      id: null,
      nome: '',
      matricula: null,
      curso: null,
      email: '',
      telefone: '',
      observacao: '',
    };
    this.observacao = '';
    this.confirmado = false;
  }

  public static getMockItem(): Donation {
    let mock = new SimpleDonation();
    mock.doacao = 'Doacao mock';
    mock.tipo = 0;
    mock.quantidade = 1;
    mock.pontuacao = 100;
    mock.observacao = 'lalalalalalalalalalalala';
    mock.representante = AddStudent.getMockStudent();
    return mock;
  }
}
