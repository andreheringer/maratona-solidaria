export interface Team {
  acronime: string;
  id: number;
  name: string;
  points: number;
  size?: number;
}
export const TEAMS: Team[] = [
  {
    acronime: 'CC',
    id: 0,
    name: 'Ciência da Computação',
    points: 0,
  },
  {
    acronime: 'SI',
    id: 1,
    name: 'Sistemas de Informação',
    points: 0,
  },
  {
    acronime: 'MC',
    id: 2,
    name: 'Matemática Computacional',
    points: 0,
  },
  {
    acronime: 'FIS',
    id: 3,
    name: 'Física',
    points: 0,
  },
  {
    acronime: 'EST',
    id: 4,
    name: 'Estatística',
    points: 0,
  },
  {
    acronime: 'QIM',
    id: 5,
    name: 'Química',
    points: 0,
  },
  {
    acronime: 'CAT',
    id: 7,
    name: 'Ciências Atuariais',
    points: 0,
  },
];
