import { variable } from '@angular/compiler/src/output/output_ast';
import { Permission } from '../enums/permission';

export interface Option {
  name: string;
  path: string;
  active: boolean;
  minPerm: number;
}

export const MENUOPTIONS: Option[] = [
  { name: 'Sobre', path: '/about', active: true, minPerm: Permission.visitor },
  {
    name: 'Leaderboard',
    path: '/leaderboard',
    active: true,
    minPerm: Permission.user,
  },
  {
    name: 'Doações',
    path: '/colaborate',
    active: true,
    minPerm: Permission.user,
  },
  {
    name: 'Admin',
    path: '/admin',
    active: true,
    minPerm: Permission.admin,
  },
  {
    name: 'Regulamento',
    path: '/uploads/Regulamento.pdf',
    active: true,
    minPerm: Permission.visitor,
  },
  { name: 'Login', path: '/login', active: true, minPerm: Permission.visitor },
];
