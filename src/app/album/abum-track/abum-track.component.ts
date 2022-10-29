import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from "../album.service";
import { Track } from '../track';

@Component({
  selector: 'app-abum-track',
  templateUrl: './abum-track.component.html',
  styleUrls: ['./abum-track.component.scss']
})
export class AbumTrackComponent implements OnInit {

  trackForm: FormGroup;
  albumId: String;

  constructor(
    private albumService: AlbumService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.trackForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      duration: ['', [Validators.required]]
    })

  }

  asociarTrack(trackC: Track) {
    this.albumService.asociarTrack(Number(this.albumId), trackC)
      .subscribe(() => {
        this.toastrService.success('Track asociado satisfactoriamente');
        this.router.navigate(['/albums/list']);
      }, err => {
        this.toastrService.error(err, 'Error');
      });
  }

  cancelCreation() {
    this.toastrService.warning('Track no asociado', 'Asociar track');
    this.router.navigate(['/albums/list']);
  }

  ngOnInit() {
    this.trackForm.reset();
    this.albumId = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
