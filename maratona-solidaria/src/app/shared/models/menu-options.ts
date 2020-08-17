import { variable } from "@angular/compiler/src/output/output_ast";

export interface Option {
  name: string;
  path: string;
  active: boolean;
}

export const MENUOPTIONS: Option[] = [
  { name: "login", path: "/loign", active: true },
  { name: "regulamento", path: "/uploads/Regulamento.pdf", active: true },
  { name: "sobre", path: "/about", active: true },
  { name: "doações", path: "/colaborate", active: true },
];
