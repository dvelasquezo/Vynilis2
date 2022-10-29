import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumListarComponent } from './album-listar/album-listar.component';
import { AlbumDetalleComponent } from "./album-detalle/album-detalle.component";
import { AlbumCrearComponent } from "./album-crear/album-crear.component";
import { AbumTrackComponent } from "./abum-track/abum-track.component";
import { AlbumCollectorComponent } from "./album-collector/album-collector.component";


const routes: Routes = [{
  path: 'albums',
  children: [
    {
      path: 'list',
      component: AlbumListarComponent,
    },
    {
      path: 'crear',
      component: AlbumCrearComponent,
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'asociarTrack/:id',
      component: AbumTrackComponent,
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'coleccionista/:id',
      component: AlbumCollectorComponent,
      runGuardsAndResolvers: 'always'
    },
    {
      path: ':id',
      component: AlbumDetalleComponent,
      runGuardsAndResolvers: 'always'
    },

  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
