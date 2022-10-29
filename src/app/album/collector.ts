import { CollectorAlbum } from './album-collector/collector-album';
import { Performer } from "./performer";
import { Comment } from "./comment";

export class Collector {
  id: number;
  telephone: number;
  email: string;
  name: string;
  favoritePerformers: Performer[];
  comments: Comment[];
  collectorAlbums: CollectorAlbum[];

  constructor(id: number, telephone: number, email: string, name: string,
    favoritePerformers: Performer[], comments: Comment[],
    collectorAlbums: CollectorAlbum[]) {
      this.id = id;
      this.telephone = telephone;
      this.email = email;
      this.name = name;
      this.favoritePerformers = favoritePerformers;
      this.comments = comments;
      this.collectorAlbums = collectorAlbums;
  }
}
