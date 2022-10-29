import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { PrizesListComponent } from "./prizes-list/prizes-list.component";
import { PrizeDetailComponent } from "./prize-detail/prize-detail.component";
import { PrizeCreateComponent } from "./prize-create/prize-create.component";
import { PrizeRoutingModule } from "./prize-routing.module";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    PrizeRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PrizesListComponent, PrizeDetailComponent, PrizeCreateComponent],
  exports: [
    PrizesListComponent
  ]
})
export class PrizeModule { }
