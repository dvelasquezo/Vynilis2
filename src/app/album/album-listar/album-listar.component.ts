import { Component, OnInit } from '@angular/core';
import { Album } from "../album";
import { AlbumService } from "../album.service";

@Component({
  selector: 'app-album-listar',
  templateUrl: './album-listar.component.html',
  styleUrls: ['./album-listar.component.css']
})
export class AlbumListarComponent implements OnInit {

  albums: Array<Album>;
  existenAlbumes: boolean;
  idAlbum: number;
  selected:boolean = false;

  constructor(private albumService: AlbumService) { }

  getAlbums(): void {
    this.albumService.getAlbums().subscribe(albums => {
      this.albums = albums;
      if (this.albums.length > 0) {
        this.existenAlbumes = true;
      }
      else {
        this.existenAlbumes = false;
      }
    });
  }

  onSelected(a: number): void {
    this.selected = true;
    this.idAlbum = a;
  }

  offSelected(): void {
    this.selected = false;
    this.idAlbum = null;
  }

  ngOnInit() {
    this.getAlbums();
  }

}
