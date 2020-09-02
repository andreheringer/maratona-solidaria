import { Donation } from "./donation";
import { from } from "rxjs";
export class SimpleDonation implements Donation {
  public doacao: string;
  public tipo: number;
  public quantidade: number;
  public representante_id: string;
  public data: Date;
  public pontuacao: number;
  public observacao: string;

  constructor() {
    this.doacao = "";
    this.tipo = null;
    this.quantidade = null;
    this.representante_id = "";
    this.data = null;
    this.observacao = "";
  }
}
