import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateMusicianRequest, MusicianService } from '../musician.service';

@Component({
  selector: 'app-musician-create',
  templateUrl: './musician-create.component.html',
  styleUrls: ['./musician-create.component.css']
})
export class MusicianCreateComponent implements OnInit {

  private formBuilder: FormBuilder;
  private musicianService: MusicianService;
  private toastrService: ToastrService;
  private router: Router;

  clientForm: any;

  constructor(formBuilder: FormBuilder, musicianService: MusicianService, toastrService: ToastrService, router: Router) {
    this.formBuilder = formBuilder;
    this.musicianService = musicianService;
    this.toastrService = toastrService;
    this.router = router;
  }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      name: ["", Validators.required],
      image: ["", Validators.required],
      description: ["", Validators.required],
      birthDate: ["", Validators.required]
    });
  }

  createMusician(request: CreateMusicianRequest) {
    // this.showSuccess(newClient);
    console.log(request.birthDate);
    this.musicianService.createMusician(request)
      .subscribe(
        createdMusician => {
          this.toastrService.success('Músico creado satisfactoriamente');
          this.router.navigate(['/musicians/list']);
        },
        err => {
          this.toastrService.error(err, 'Error');
        }
      );
  }

  cancelCreation() {
    this.router.navigate(['/musicians/list']);
  }
}
