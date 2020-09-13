import { Team } from './team';

export interface Student {
  nome: string;
  matricula: number;
  curso: Team;
  email: string;
  telefone: string;
  observacao: string;
}
