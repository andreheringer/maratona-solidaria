export interface Team {
  acronime: string;
  id: number;
  name: string;
  points: number;
}
export const TEAMS: Team[] = [
  {
    acronime: 'CC',
    id: 0,
    name: 'Ciência da Computação',
    points: 100,
  },
  {
    acronime: 'SI',
    id: 1,
    name: 'Sistemas de Informação',
    points: 60,
  },
  {
    acronime: 'MC',
    id: 2,
    name: 'Matemática Computacional',
    points: 50,
  },
  {
    acronime: 'FIS',
    id: 3,
    name: 'Física',
    points: 150,
  },
  {
    acronime: 'EST',
    id: 4,
    name: 'Estatística',
    points: 50,
  },
  {
    acronime: 'QIM',
    id: 5,
    name: 'Química',
    points: 80,
  },
  {
    acronime: 'CAT',
    id: 7,
    name: 'Ciências Atuariais',
    points: 15,
  },
];
