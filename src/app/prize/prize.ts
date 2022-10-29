import { PerformerPrize } from "./performerPrize";

export class Prize {
  id: number;
  organization: string;
  name: string;
  description: string;
  performerPrizes: PerformerPrize[];

  public constructor(id: number, organization: string, name: string,
     description: string, performerPrizes: PerformerPrize[]) {
    this.id = id;
    this.description = description;
    this.name = name;
    this.organization = organization;
    this.performerPrizes = performerPrizes;
  }

}
