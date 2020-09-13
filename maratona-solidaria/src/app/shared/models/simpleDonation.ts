import { AddStudent } from './addStudent';
import { Donation } from './donation';
import { Student } from './student';
export class SimpleDonation implements Donation {
  public doacao: string;
  public tipo: number;
  public quantidade: number;
  public representante: Student;
  public data: Date;
  public pontuacao: number;
  public observacao: string;

  constructor() {
    this.doacao = '';
    this.tipo = null;
    this.quantidade = null;
    this.representante = {
      nome: '',
      matricula: null,
      curso: null,
      email: '',
      telefone: '',
      observacao: '',
    };
    this.data = null;
    this.observacao = '';
  }

  public static getMockItem(): Donation {
    let mock = new SimpleDonation();
    mock.doacao = 'Doacao mock';
    mock.tipo = 0;
    mock.quantidade = 1;
    mock.pontuacao = 100;
    mock.data = new Date();
    mock.observacao = 'lalalalalalalalalalalala';
    mock.representante = AddStudent.getMockStudent();
    return mock;
  }
}
