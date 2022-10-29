import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlbumRoutingModule } from "./album-routing.module";
import { AlbumListarComponent } from "./album-listar/album-listar.component";
import { AlbumDetalleComponent } from "./album-detalle/album-detalle.component";
import { AlbumCrearComponent } from "./album-crear/album-crear.component";
import { AbumTrackComponent } from "./abum-track/abum-track.component";
import { AlbumCollectorComponent } from "./album-collector/album-collector.component";


@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    AlbumRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [AlbumListarComponent, AlbumDetalleComponent,
    AlbumCrearComponent,AbumTrackComponent, AlbumCollectorComponent],
  exports: [AlbumListarComponent]
})
export class AlbumModule { }
