import { Component, OnInit } from '@angular/core';
import { AlbumService } from "../album.service";
import { Album } from "../album";
import { Genero } from "../enumGenero";
import { CasaDisco } from "../enumCasaDisco";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-crear',
  templateUrl: './album-crear.component.html',
  styleUrls: ['./album-crear.component.css']
})
export class AlbumCrearComponent implements OnInit {

  albumForm: FormGroup;
  generos = Genero;
  casasDisco = CasaDisco;

  constructor(
    private albumService: AlbumService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
  ) {

    this.albumForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      cover: ['', [Validators.required]],
      releaseDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      recordLabel: ['', [Validators.required, Validators.minLength(2)]],
    })
  }

  createAlbum(albumC: Album) {
    const dateB: Date = new Date(albumC.releaseDate);
    albumC.releaseDate = dateB;
    console.log(JSON.stringify(albumC))
    this.albumService.createAlbum(albumC)
      .subscribe(album => {
        this.toastrService.success('Album creado satisfactoriamente');
        this.router.navigate(['/albums/list']);
      }, err => {
        this.toastrService.error(err, 'Error');
      });
      window.top.postMessage('createAlbum', 'http://localhost/albums/list')
  }


  cancelCreation() {
    this.toastrService.warning('Album no creado', 'Album creacion');
    window.top.postMessage('cancelCreation', '*')
    this.router.navigate(['/albums/list']);

  }

  ngOnInit() {
    this.albumForm.reset();
  }



}
