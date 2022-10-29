import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from "../album.service";
import { CollectorAlbum } from "../album-collector/collector-album";
import { Collector } from "../collector";

@Component({
  selector: 'app-album-collector',
  templateUrl: './album-collector.component.html',
  styleUrls: ['./album-collector.component.scss']
})
export class AlbumCollectorComponent implements OnInit {

  collectorForm: FormGroup;
  albumId: String;
  collectors: Array<Collector>;
  selected: string;

  constructor(private albumService: AlbumService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.collectorForm = this.formBuilder.group({
        id: ['', [Validators.required]],
        price: ['', [Validators.required]],
        status: ['', [Validators.required]]
      });
  }

  agregarCollecionista(collector: CollectorAlbum): void {
    this.selected = collector.id.toString(),
    collector.id = undefined;
    this.albumService.asociarColeccionista(this.selected, this.albumId, collector).subscribe(
      ca => {
        this.showSuccess(ca);
        this.router.navigate(['/albums/list']);
      },error => {
        this.showError(error.error.message);
      });
  }

  cancelarOperacion() {
    this.router.navigate(['/albums/list']);
  }

  showSuccess(ca: CollectorAlbum) {
    this.toastrService.success('Operación exitosa!');
  }

  showError(msg: string) {
    this.toastrService.error('Error!', `${msg}`);
  }

  ngOnInit() {
    this.collectorForm.reset();
    this.albumId = this.activatedRoute.snapshot.paramMap.get('id');
    this.collectors = undefined;
  }

  ngAfterContentChecked() {
    if(this.collectors == undefined) {
      this.albumService.getCollectors().subscribe(cs => {
        this.collectors = cs;
      });
    }
  }

}
