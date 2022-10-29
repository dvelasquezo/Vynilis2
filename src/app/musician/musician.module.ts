import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MusicianListComponent } from './musician-list/musician-list.component';
import { MusicianDetailComponent } from './musician-detail/musician-detail.component';
import { MusicianRoutingModule } from "./musician-routing.module";
import { MusicianCreateComponent } from './musician-create/musician-create.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    MusicianRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MusicianListComponent, MusicianDetailComponent, MusicianCreateComponent],
  exports: [MusicianListComponent]
})
export class MusicianModule { }

