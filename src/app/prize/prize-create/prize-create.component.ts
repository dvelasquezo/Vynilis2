import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Prize } from '../prize';
import { ActivatedRoute, Router } from '@angular/router';
import { PrizeService } from '../prize.service';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-prize-create',
  templateUrl: './prize-create.component.html',
  styleUrls: ['./prize-create.component.scss'],
})
export class PrizeCreateComponent implements OnInit {
  prizeForm: FormGroup;

  @Output() cancel = new EventEmitter<{ result: number}>();
  prizeCreated: Prize;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prizeService: PrizeService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.prizeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      organization: ['', Validators.required],
      description: ['', [Validators.required]],
    });
  }

  createPrize(newPrize: Prize): void {
    this.prizeService.createPrize(newPrize).subscribe(prizeCreated => {
      this.prizeCreated = prizeCreated;
      this.showSuccess(this.prizeCreated.name);
      this.cancel.emit({ result: 1});
    },
    error => {
      console.log(error);
      this.showError(error.error.message);
    });
  }

  regresarLista(result: number): void {
    this.cancel.emit({ result: result});
  }

  showError(msg: string) {
    this.toastr.error('Error!', `${msg}`, { "progressBar": true, timeOut: 5000 });
  }

  showSuccess(msg: string) {
    this.toastr.success('Creado exitosamente!', `Premio ${msg}`, { "progressBar": true, timeOut: 5000 });
  }
}
