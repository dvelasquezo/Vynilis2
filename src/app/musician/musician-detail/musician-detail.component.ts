import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Prize } from 'src/app/prize/prize';
import { PrizeService } from 'src/app/prize/prize.service';
import { Musician } from '../musician';
import { MusicianService } from '../musician.service';

@Component({
  selector: 'app-musician-detail',
  templateUrl: './musician-detail.component.html',
  styleUrls: ['./musician-detail.component.scss']
})
export class MusicianDetailComponent implements OnInit {

  @Input()
  musicianId: number
  musician: Musician
  loading: boolean;

  @Output()
  backButtonClicked = new EventEmitter();

  private musicianService: MusicianService;
  private prizeService: PrizeService;
  private prizes: Prize[];

  constructor(musicianService: MusicianService, prizeService: PrizeService) {
    this.musicianService = musicianService;
    this.prizeService = prizeService;
    this.musician = null;
  }

  ngOnInit() {
    this.loadComponentInformation();
  }

  onBackButtonClick(): void {
    this.backButtonClicked.emit();
  }

  getPrize(prizeId: number) : Prize {
    return this.prizes.find(p => p.id == prizeId);
  }

  private loadComponentInformation(): void {
    this.prizeService.getPrizes()
      .subscribe(prizes => {
        this.prizes = prizes;
        this.musicianService.getMusician(this.musicianId)
          .subscribe(musician => {
            this.musician = musician;
          });
      });
  }
}
