/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Musician } from './musician';
import { CreateMusicianRequest, MusicianService } from './musician.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import faker from 'faker';

describe('Service: Musician', () => {
  let service: MusicianService;
  let httpMock: HttpTestingController;
  let apiUrl = environment.baseUrl + "musicians";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MusicianService]
    });

    service = TestBed.inject(MusicianService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it("getMusicians() should return all the musicians when there are musicians", () => {
    let mockMusicians: Musician[] = [];

    for (let i = 1; i < 11; i++) {
      let musician = new Musician(
        i,
        faker.lorem.sentence(),
        faker.image.imageUrl(),
        faker.lorem.sentence(),
        faker.date.past(),
        [],
        []
      );

      mockMusicians.push(musician);
    }

    service.getMusicians().subscribe((musicians) => {
      expect(musicians).toBeInstanceOf(Array);
      expect(musicians.length).toBe(mockMusicians.length);
      expect(musicians[0]).toBeInstanceOf(Musician);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockMusicians);
  });

  it("getMusicians() should return an empty array when there are no musicians", () => {
    let mockMusicians: Musician[] = [];

    service.getMusicians().subscribe((musicians) => {
      expect(musicians).toBeInstanceOf(Array);
      expect(musicians.length).toBe(0);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockMusicians);
  });

  it("getMusician() should return a musician with no albums nor prizes when there is one with the specified id", () => {
    let mockMusician: Musician;
    let musicianId: number;

    musicianId = 100;
    mockMusician = new Musician(
      musicianId,
      faker.lorem.sentence(),
      faker.image.imageUrl(),
      faker.lorem.sentence(),
      faker.date.past(),
      [],
      []
    );

    service.getMusician(musicianId).subscribe((musician) => {
      expect(musician).toBeInstanceOf(Musician);
      expect(musician.id).toBe(mockMusician.id);
      expect(musician.name).toBe(mockMusician.name);
      expect(musician.image).toBe(mockMusician.image);
      expect(musician.description).toBe(mockMusician.description);
      expect(musician.birthDate).toBe(mockMusician.birthDate);
      expect(musician.albums).toBeInstanceOf(Array);
      expect(musician.albums.length).toBe(0);
    });

    const req = httpMock.expectOne(`${apiUrl}/${musicianId}`);
    expect(req.request.method).toBe("GET");
    req.flush(mockMusician);
  });

  it("createMusician() should return created musician when all required data is provided", () => {
    let createMusicianRequest: CreateMusicianRequest
    let musician: Musician
    let nextMusicianId: number

    nextMusicianId = faker.datatype.number();
    createMusicianRequest = new CreateMusicianRequest();
    createMusicianRequest.name = faker.name.firstName();
    createMusicianRequest.image = faker.image.imageUrl();
    createMusicianRequest.description = faker.lorem.sentence();
    createMusicianRequest.birthDate = faker.date.past();

    service.createMusician(createMusicianRequest).subscribe((createdMusician) => {
      expect(createdMusician).toBeInstanceOf(Musician);
      expect(createdMusician.id).toBe(nextMusicianId);
      expect(createdMusician.name).toBe(createMusicianRequest.name);
      expect(createdMusician.image).toBe(createMusicianRequest.image);
      expect(createdMusician.description).toBe(createMusicianRequest.description);
      expect(createdMusician.birthDate).toBe(createMusicianRequest.birthDate);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("POST");
    req.flush(
      new Musician(
        nextMusicianId,
        createMusicianRequest.name,
        createMusicianRequest.image,
        createMusicianRequest.description,
        createMusicianRequest.birthDate,
        [],
        []
      )
    );
  });
});
