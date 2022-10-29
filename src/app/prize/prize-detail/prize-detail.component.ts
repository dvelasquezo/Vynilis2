import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Prize } from '../prize';
import { ActivatedRoute, Router } from '@angular/router';
import { PrizePerformerDetail } from './prize-performer-detail';
import { PrizeService } from '../prize.service';

@Component({
  selector: 'app-prize-detail',
  templateUrl: './prize-detail.component.html',
  styleUrls: ['./prize-detail.component.css']
})
export class PrizeDetailComponent implements OnInit {

  @Input() prizeDetail: Prize;
  @Output() cancel = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prizeService: PrizeService) { }

  prizeId: number;
  performers: Array<PrizePerformerDetail>;

  getPrizeDetail(): void {
    this.prizeService.getPrize(this.prizeId)
      .subscribe(prizeDetail => {
        this.prizeDetail = prizeDetail;
      });
  }

  getPerformersList() {
    if(this.performers == undefined) {
      this.prizeService.getPrizePerformers(this.prizeDetail.id).subscribe(ps => {
        this.performers = ps;
      });
    }
  }

  ngOnInit() {
    // if (this.prizeDetail == undefined) {
    //   console.log('routerLink');
    //   this.prizeId = +this.route.snapshot.paramMap.get('id');
    //   this.getPrizeDetail();
    // } else {
    //   console.log(this.prizeDetail.id);
    // }
  }

  ngAfterContentChecked() {
    this.getPerformersList();
  }

  regresarLista(): void {
    this.cancel.emit();
  }

}
