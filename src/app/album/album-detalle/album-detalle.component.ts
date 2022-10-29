import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AlbumService } from "../album.service";
import { ActivatedRoute, Router } from '@angular/router';

import { Album } from '../album';
import { CollectorAlbum } from "../album-collector/collector-album";
import { Collector } from '../collector';

@Component({
  selector: 'app-album-detalle',
  templateUrl: './album-detalle.component.html',
  styleUrls: ['./album-detalle.component.scss']
})
export class AlbumDetalleComponent implements OnInit {

  @Input() idAlbumDetalle: number;
  @Output() cancelar = new EventEmitter();

  albumDetalle: Album;
  verTrack: Boolean;
  verCollector: Boolean;
  collectors: Collector[];
  coleccionistas: CollectorAlbum[];
  sinPerformers: Boolean;

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  getAlbumDetalle(): void {
    this.albumService.getAlbumDetalle(this.idAlbumDetalle).subscribe(album => {
      this.albumDetalle = album;
      if (this.albumDetalle.performers.length == 0) {
        this.sinPerformers = true
      }
      else{
        this.sinPerformers = false
      }
      console.log(JSON.stringify(this.albumDetalle))
    });
    this.albumService.getCollectors().subscribe(collectors => {
      this.collectors = collectors;
      for(let c of this.collectors) {
        this.albumService.getCollectorAlbum(c.id).subscribe(albums => {
          for(let a of albums) {
            if(a.album.id == this.albumDetalle.id) {
              this.coleccionistas.push(a);
            }
          }
        });
      }
    });
  }

  regresarLista(): void {
    this.cancelar.emit();
  }

  mostrarTrack(): void {
    this.verTrack = true;
  }

  cerrarTracks(): void {
    this.verTrack = false;
  }

  mostrarCollectors(): void {
    this.verCollector = true;
  }

  cerrarCollectors(): void {
    this.verCollector = false;
  }

  ngOnInit() {
    this.getAlbumDetalle();
    this.verTrack = false;
    this.verCollector = false;
    this.coleccionistas = [];
  }
}
