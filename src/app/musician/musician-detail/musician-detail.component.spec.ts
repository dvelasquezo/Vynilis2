/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MusicianDetailComponent } from './musician-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { Musician } from '../musician';
import faker from 'faker';
import { of } from 'rxjs';
import { MusicianService } from '../musician.service';
import { PrizeService } from 'src/app/prize/prize.service';

describe('MusicianDetailComponent', () => {
  let component: MusicianDetailComponent;
  let fixture: ComponentFixture<MusicianDetailComponent>;
  let mockMusicianService;
  let mockPrizeService;
  let musician: Musician;

  beforeEach(async(() => {
    mockMusicianService = jasmine.createSpyObj(['getMusician']);
    mockPrizeService = jasmine.createSpyObj(['getPrizes']);
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ MusicianDetailComponent ],
      providers: [
        { provide: MusicianService, useValue: mockMusicianService },
        { provide: PrizeService, useValue: mockPrizeService }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(MusicianDetailComponent);
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it("OnInit new", () => {
    // Arrange
    musician = new Musician(
      faker.datatype.number(),
      faker.lorem.sentence(),
      faker.image.imageUrl(),
      faker.lorem.sentence(),
      faker.date.past().toString(),
      [],
      []
    );
    mockMusicianService.getMusician.and.returnValue(of(musician));
    mockPrizeService.getPrizes.and.returnValue(of([]));

    // Act
    fixture.detectChanges();

    // Assert
    let headings: NodeList = fixture.nativeElement.querySelectorAll('h1');
    expect(headings.length).toBe(1);
    expect(headings[0].textContent).toContain(musician.name);

    let images: NodeListOf<HTMLImageElement> = fixture.nativeElement.querySelectorAll('img');
    expect(images.length).toBe(1);
    expect(images[0].src).toBe(musician.image);

    expect(fixture.nativeElement.querySelector('#premios')).toBeFalsy();

    let buttons: NodeList = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(1);
    expect(buttons[0].textContent).toContain('Regresar');
  });
});
