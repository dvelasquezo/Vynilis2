import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from "@angular/common/http";
import { HttpErrorInterceptor } from './interceptors/http-error-interceptor.service';

import { AlbumModule } from "./album/album.module";
import { MusicianModule } from "./musician/musician.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrizeModule } from './prize/prize.module';
import { HomeModule } from "./home/home.module";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AlbumModule,
    MusicianModule,
    PrizeModule,
    HomeModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
