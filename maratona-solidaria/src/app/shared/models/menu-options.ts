import { variable } from '@angular/compiler/src/output/output_ast';
import { Permission } from '../enums/permission';

export interface Option {
  name: string;
  path: string;
  minPerm: number;
}

export const MENUOPTIONS: Option[] = [
  { name: 'Sobre', path: '/about', minPerm: Permission.visitor},
  {
    name: 'Leaderboard',
    path: '/leaderboard',
    minPerm: Permission.user,
  },
  {
    name: 'Doações',
    path: '/colaborate',
    minPerm: Permission.user,
  },
  {
    name: 'Admin',
    path: '/admin',
    minPerm: Permission.admin,
  },
  {
    name: 'Regulamento',
    path: '/uploads/Regulamento.pdf',
    minPerm: Permission.visitor,
  },
  { name: 'Login', path: '/login',  minPerm: Permission.visitor},
];
