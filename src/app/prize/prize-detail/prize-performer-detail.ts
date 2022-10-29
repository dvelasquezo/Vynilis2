import { Performer } from "../../album/performer";
import { Prize } from "../prize";

export class PrizePerformerDetail {
  id: number;
  premiationDate: string;
  performer: Performer;
  prize: Prize;

  public constructor(id: number, premiationDate: string, performer: Performer, prize: Prize) {
    this.id = id;
    this.premiationDate = premiationDate;
    this.performer = performer;
    this.prize = prize;
  }
}
