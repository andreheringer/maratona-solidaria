import { variable } from '@angular/compiler/src/output/output_ast';
import { Permission } from '../enums/permission';

export interface Option {
  name: string;
  path: string;
  active: boolean;
  minPerm: number;
}

export const MENUOPTIONS: Option[] = [
  { name: 'login', path: '/login', active: true, minPerm: Permission.visitor },
  { name: 'sobre', path: '/about', active: true, minPerm: Permission.visitor },
  {
    name: 'leaderboard',
    path: '/leaderboard',
    active: true,
    minPerm: Permission.user,
  },
  {
    name: 'doações',
    path: '/colaborate',
    active: true,
    minPerm: Permission.user,
  },
  {
    name: 'admin',
    path: '/admin',
    active: true,
    minPerm: Permission.admin,
  },
  {
    name: 'regulamento',
    path: '/uploads/Regulamento.pdf',
    active: true,
    minPerm: Permission.visitor,
  },
];
