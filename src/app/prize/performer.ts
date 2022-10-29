export class Performer {
  id: number;
  name: string;
  image: string;
  description: string;
  creationDate: string;
  birthDate: string;

  constructor(id: number, name: string, image: string, description: string,
    creationDate: string, birthDate: string) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.creationDate = creationDate;
      this.birthDate = birthDate;
    }
}
