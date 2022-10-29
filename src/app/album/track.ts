export class Track {
  id: number;
  name: string;
  duration: string;

  constructor(id: number,
    name: string,
    duration: string) {
    this.id = id;
    this.name = name;
    this.duration = duration;
  }
}
