import { Album } from "../album/album";
import { PerformerPrize } from "../prize/performerPrize";

export class Musician {
  id: number;
  name: string;
  image: string;
  description: string;
  birthDate: string;
  albums: Album[];
  performerPrizes: PerformerPrize[];

  constructor(id: number, name: string, image: string, description: string, birthDate: string, albums: Album[], performerPrizes: PerformerPrize[]) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.birthDate = birthDate;
    this.albums = albums;
    this.performerPrizes = performerPrizes;
  }
}
