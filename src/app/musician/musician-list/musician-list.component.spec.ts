/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicianListComponent } from './musician-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import faker from 'faker';
import { Musician } from '../musician';
import { MusicianService } from '../musician.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('MusicianListComponent', () => {
  let fixture: ComponentFixture<MusicianListComponent>;
  let element: HTMLElement;
  let mockMusicianService;
  let musicians: Musician[];

  beforeEach(async(() => {
    mockMusicianService = jasmine.createSpyObj(['getMusicians']);
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [MusicianListComponent],
      providers: [
        { provide: MusicianService, useValue: mockMusicianService }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(MusicianListComponent);
  }));

  it("OnInit when there is one musician should show image and figcaption with name", () => {
    musicians = [
      new Musician(
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.image.imageUrl(),
        faker.lorem.sentence(),
        faker.date.past().toString(),
        [],
        []
      )
    ]
    mockMusicianService.getMusicians.and.returnValue(of(musicians));

    fixture.detectChanges();

    let musiciansDiv: HTMLElement = fixture.nativeElement.querySelector('#musicians');
    expect(musiciansDiv).not.toBeFalsy();

    let musiciansImages: NodeList = musiciansDiv.querySelectorAll('img');
    expect(musiciansImages.length).toBe(musicians.length);

    let musiciansFigcaptions: NodeList = musiciansDiv.querySelectorAll('figcaption');
    expect(musiciansFigcaptions.length).toBe(musicians.length);
    expect(musiciansFigcaptions[0].textContent).toContain(musicians[0].name);
  });

  it("OnInit when there are no musicians should show message to user", () => {
    mockMusicianService.getMusicians.and.returnValue(of([]));

    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).toContain('No existen músicos');
  });

  it("loading changed to true should show loading indicator to the user", () => {
    musicians = [
      new Musician(
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.image.imageUrl(),
        faker.lorem.sentence(),
        faker.date.past(),
        [],
        []
      )
    ]
    mockMusicianService.getMusicians.and.returnValue(of(musicians));
    fixture.detectChanges();

    fixture.componentInstance.loading = true;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('div.spinner').length).toBe(1);
    expect(fixture.nativeElement.querySelectorAll('#musicians').length).toBe(0);
  });

  it("loading changed to false should hide loading indicator to the user", () => {
    musicians = [
      new Musician(
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.image.imageUrl(),
        faker.lorem.sentence(),
        faker.date.past(),
        [],
        []
      )
    ]
    mockMusicianService.getMusicians.and.returnValue(of(musicians));
    fixture.detectChanges();

    fixture.componentInstance.loading = false;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('div.spinner')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('#musicians')).toBeTruthy();
  });
});
