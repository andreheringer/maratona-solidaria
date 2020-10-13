import { Student } from './student';

export interface Donation {
  id: number;
  doacao: string;
  tipo: number;
  quantidade: number;
  representante: Student;
  data: Date;
  pontuacao: number;
  observacao: string;
}
