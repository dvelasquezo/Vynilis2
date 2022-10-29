import { Album } from "../album";
import { Collector } from "../collector";

export class CollectorAlbum {
  id: number;
  price: number;
  status: string;
  album: Album;
  collector: Collector;

  constructor(id: number, price: number, status: string,
    album: Album, collector: Collector) {
      this.id = id;
      this.price = price;
      this.status = status;
      this.album = album;
      this.collector = collector;
    }
}
