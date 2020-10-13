import { Team } from './team';

export interface Student {
  id: number;
  nome: string;
  matricula: number;
  curso: Team;
  email: string;
  telefone: string;
  observacao: string;
}
