export class Performer {
  id: number;
  name: string;
  image: string;
  description: string;
  birthDate: any;

  constructor(id: number,
    name: string,
    image: string,
    description: string,
    birthDate: any) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.birthDate = birthDate;
  }

}
