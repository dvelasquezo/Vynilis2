import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicianListComponent } from './musician-list/musician-list.component';
import { MusicianCreateComponent } from './musician-create/musician-create.component';


const routes: Routes = [{
  path: 'musicians',
  children: [
    {
      path: 'list',
      component: MusicianListComponent,
    },
    {
      path: 'create',
      component: MusicianCreateComponent,
    },
    {
      path: ':id',
      component: MusicianListComponent,
      runGuardsAndResolvers: 'always'
    }
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicianRoutingModule { }
