import { Component, OnInit } from '@angular/core';
import { Musician } from '../musician';
import { MusicianService } from '../musician.service';

@Component({
  selector: 'app-musician-list',
  templateUrl: './musician-list.component.html',
  styleUrls: ['./musician-list.component.css']
})
export class MusicianListComponent implements OnInit {

  private musicianService: MusicianService;
  musicians: Array<Musician>;
  loading: boolean;
  selected: boolean;
  selectedMusicianId: number;

  constructor(musicianService: MusicianService) {
    this.musicianService = musicianService;
    this.musicians = [];
    this.loading = false;
    this.selected = false;
  }

  ngOnInit() {
    this.getMusicians();
  }

  musicianExists(): boolean {
    return this.musicians.length > 0;
  }

  onSelected(musicianId: number): void {
    this.selected = true;
    this.selectedMusicianId = musicianId;
  }

  unselect(): void {
    this.selected = false;
  }

  private getMusicians(): void {
    this.loading = true;
    this.musicianService.getMusicians()
      .subscribe(musicians => {
        this.musicians = musicians;
        this.loading = false;
      });
  }
}
