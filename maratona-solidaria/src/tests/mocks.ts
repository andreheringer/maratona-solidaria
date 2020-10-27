import { Observable } from 'rxjs';
import { PRODUCTS } from './../app/shared/models/product';

export const mockedToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtSWQiOjB9.T9lZ82YomeeceiXejEZo0IRk9g2eVjKCo93a2v34Gyc';

export const donationStub = {
  doacao: 'Doação Teste',
  tipo: PRODUCTS[0].id,
  quantidade: 3,
  representante: {
    id: 0,
    nome: 'Henrique',
    matricula: 2016100000,
    curso: {
      id: 0,
      name: 'Ciência da Computação',
      points: 0,
      acronime: 'CC',
      size: 1,
    },
    email: 'henrique@mail.com',
    telefone: null,
    observacao: null,
  },
  data: null,
  pontuacao: PRODUCTS[0].points,
  observacao: null,
  confirmado: false,
};

export const createAuthRepositoryMock = (): any => {
  return {
    login: () => {
      return new Observable((subscriber) => {
        subscriber.next({
          auth_token: mockedToken,
          equipe_id: 0,
          is_admin: true,
        });
        subscriber.complete();
      });
    },
    refresh: () => {
      return new Observable((subscriber) => {
        subscriber.next({
          equipe_id: 0,
          is_admin: true,
        });
        subscriber.complete();
      });
    },
  };
};

export const createTeamsRepositoryMock = (): any => {
  return {
    getClassificacao: () => {
      return new Observable((subscriber) => {
        subscriber.next([
          {
            id: 0,
            nome: 'Ciência da Computação',
            pontuacao: 0,
            tamanho: 1,
            sigla: 'CC',
          },
        ]);
        subscriber.complete();
      });
    },
  };
};

export const createStudentsRepositoryMock = (): any => {
  return {
    getStudents: () => {
      return new Observable((subscriber) => {
        subscriber.next([
          {
            id: 0,
            nome: 'Henrique',
            matricula: 2016100000,
            equipe_id: 0,
            email: 'henrique@mail.com',
            telefone: null,
            observacao: null,
          },
        ]);
        subscriber.complete();
      });
    },
    createStudent: (student) => {
      return new Observable((subscriber) => {
        subscriber.next({
          id: 0,
        });
        subscriber.complete();
      });
    },
  };
};

export const createDonationsRepositoryMock = (): any => {
  return {
    getDonations: () => {
      return new Observable((subscriber) => {
        subscriber.next([
          {
            id: 0,
            doacao: 'Doação Teste',
            tipo: '0',
            quantidade: 3,
            aluno_id: 0,
            data: null,
            pontuacao: 100,
            observacao: null,
            confirmado: false,
          },
        ]);
        subscriber.complete();
      });
    },
    createDonation: (donation) => {
      return new Observable((subscriber) => {
        subscriber.next({
          donate_id: 0,
        });
        subscriber.complete();
      });
    },
    confirmDonation: (id) => {
      return new Observable((subscriber) => {
        subscriber.next({
          id: 0,
          doacao: 'Doação Teste',
          tipo: '0',
          quantidade: 3,
          aluno_id: 0,
          data: null,
          pontuacao: 100,
          observacao: null,
          confirmado: true,
        });
        subscriber.complete();
      });
    },
  };
};
