import { Student } from './student';

export interface Donation {
  doacao: string;
  tipo: number;
  quantidade: number;
  representante: Student;
  data: Date;
  pontuacao: number;
  observacao: string;
}
