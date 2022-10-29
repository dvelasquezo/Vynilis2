import { Component, OnInit } from '@angular/core';
import { Prize } from "../prize";
import { PrizeService } from "../prize.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prizes-list',
  templateUrl: './prizes-list.component.html',
  styleUrls: ['./prizes-list.component.css']
})
export class PrizesListComponent implements OnInit {

  constructor(private prizeService: PrizeService,
     private route: ActivatedRoute,
     private router: Router) { }
  prizes: Array<Prize>;
  selected = false;
  create = false;
  selectedPrize : Prize;

  getPrizesList() {
    this.prizeService.getPrizes().subscribe(ps => {
      this.prizes = ps;
    });
  }

  getPrizeInfo(id: number) {
    this.prizeService.getPrize(id).subscribe(p => {
      this.selectedPrize = p;
    });
  }

  onSelected(id: number): void {
    this.getPrizeInfo(id);
    this.selected = true;
  }

  offSelected(): void {
    this.selected = false;
    this.selectedPrize = null;
    // this.router.navigate(['prizes/list'], { relativeTo: this.route });
  }

  onCreate(): void {
    this.create = true;
  }

  offCreate(cancel): void {
    this.create = false;
    let result = cancel.result;
    if(result == 1) {
      this.getPrizesList();
    }
  }

  ngOnInit() {
    this.getPrizesList();
  }

}
