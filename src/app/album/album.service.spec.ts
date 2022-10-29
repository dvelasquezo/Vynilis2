/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from "@angular/core/testing";
import { AlbumService } from "./album.service";

import {
  HttpTestingController,
  HttpClientTestingModule,
} from "@angular/common/http/testing";

import faker from "faker";
import { Album } from "./album";
import { environment } from "../../environments/environment";
import { Track } from "./track";
import { Collector } from "./collector";
import { CollectorAlbum } from "./album-collector/collector-album";

describe("Service: Album", () => {
  let injector: TestBed;
  let service: AlbumService;
  let httpMock: HttpTestingController;
  let apiUrl = environment.baseUrl + "albums";
  let collectorUrl: string = environment.baseUrl + 'collectors';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumService],
    });
    injector = getTestBed();
    service = injector.get(AlbumService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("getAlbums() should return 10 records", () => {
    let mockAlbums: Album[] = [];

    for (let i = 1; i < 11; i++) {
      let album = new Album(
        i,
        faker.lorem.sentence(),
        faker.image.imageUrl(),
        faker.date.past(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        null,
        null,
        null
      );
      mockAlbums.push(album);
    }

    service.getAlbums().subscribe((albums) => {
      expect(albums.length).toBe(10);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockAlbums);
  });

  it("getAlbum(10) should find a album", () => {
    const id: number = 10;
    const name: string = faker.lorem.sentence();
    const cover: string = faker.image.imageUrl();
    const releaseDate: any = faker.date.past();
    const description: string = faker.lorem.sentence();
    const genre: string = faker.lorem.sentence();
    const recordLabel: string = faker.lorem.sentence();
    let mockAlbum: Album = new Album(
      id,
      name,
      cover,
      releaseDate,
      description,
      genre,
      recordLabel,
      null,
      null,
      null
    );
    service.getAlbumDetalle(id).subscribe((album) => {
      expect(album.id).toBe(id);
      expect(album.name).toBe(name);
      expect(album.cover).toBe(cover);
      expect(album.releaseDate).toBe(releaseDate);
      expect(album.description).toBe(description);
      expect(album.genre).toBe(genre);
      expect(album.recordLabel).toBe(recordLabel);
    });
    const req = httpMock.expectOne(apiUrl + `/${id}`);
    expect(req.request.method).toBe("GET");
    req.flush(mockAlbum);
  });

  it("getAlbum(0) should not find a prize", () => {
    const id: number = 10;
    let mockAlbum: Album = null;
    service.getAlbumDetalle(id).subscribe((prize) => {
      expect(prize).toBe(null);
    });
    const req = httpMock.expectOne(apiUrl + `/${id}`);
    expect(req.request.method).toBe("GET");
    req.flush(mockAlbum);
  });

  it("create Album should create", () => {
    const name: string = faker.lorem.sentence();
    const cover: string = faker.image.imageUrl();
    const releaseDate: any = faker.date.past();
    const description: string = faker.lorem.sentence();
    const genre: string = faker.lorem.sentence();
    const recordLabel: string = faker.lorem.sentence();
    let mockAlbum: Album = new Album(
      null,
      name,
      cover,
      releaseDate,
      description,
      genre,
      recordLabel,
      null,
      null,
      null
    );

    service.createAlbum(mockAlbum).subscribe((album) => {
      expect(album.name).toBe(name);
      expect(album.cover).toBe(cover);
      expect(album.releaseDate).toBe(releaseDate);
      expect(album.description).toBe(description);
      expect(album.genre).toBe(genre);
      expect(album.recordLabel).toBe(recordLabel);
    })

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("POST");
  });

  it("track to Album should asociate", () => {
    const name: string = faker.lorem.sentence();
    const duration: string = faker.random.number;
    const idAlbum:number = 100;

    let mockTrack: Track = new Track(
      null,
      name,
      duration
    );
    service.asociarTrack(idAlbum,mockTrack).subscribe((track) => {
      expect(track.name).toBe(name);
      expect(track.duration).toBe(duration);
    })
    const req = httpMock.expectOne(apiUrl + '/' + idAlbum.toString()+ '/'+'tracks');
    expect(req.request.method).toBe("POST");
  });

  it("getCollectors should have 10 records", () => {
    let mockCollectors: Collector[] = [];

    for (let i = 1; i < 11; i++) {
      let collector = new Collector(
        i,
        faker.random.number(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        null,
        null,
        null
      );
      mockCollectors.push(collector);
    }

    service.getCollectors().subscribe((collectors) => {
      expect(collectors.length).toBe(10);
    });

    const req = httpMock.expectOne(collectorUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockCollectors);
  });

  it("getCollectorAlbum(101) should find 10 records", () => {
    let mockCollectorAlbums: CollectorAlbum[] = [];
    for(let i = 0; i < 10; i++) {
      let collectorAlbum: CollectorAlbum = new CollectorAlbum(101,
        faker.random.number(), faker.lorem.sentence(), new Album(faker.random.number(),  faker.lorem.sentence(),
        faker.image.imageUrl(), faker.date.past(), faker.lorem.sentence(), faker.lorem.word(),
        faker.lorem.word(), [], [], []), new Collector(faker.random.number(), faker.random.number,
        faker.lorem.sentence, faker.lorem.word(), [], [], []));
      mockCollectorAlbums.push(collectorAlbum);
    }
    service.getCollectorAlbum(101).subscribe((collectorAlbum) => {
      expect(collectorAlbum.length).toBe(10);
    });
    const req = httpMock.expectOne(collectorUrl + "/101/albums");
    expect(req.request.method).toBe("GET");
    req.flush(mockCollectorAlbums);
  });

  it("asociarColeccionista() should work", () => {
    const status: string = 'Active';
    const price: number = faker.random.number;
    const album: Album = new Album(100, faker.lorem.sentence(), faker.image.imageUrl(),
      faker.date.past(), faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence(),
      null, null, null);
    const collector: Collector = new Collector(200, faker.random.number,
    faker.lorem.sentence, faker.lorem.word(), [], [], [])
    let mockCollectorAlbum: CollectorAlbum = new CollectorAlbum(null, price, status, album, collector);
    service.asociarColeccionista(collector.id.toString(), album.id.toString(), mockCollectorAlbum).subscribe(
      collectorAlbum => {
        expect(collectorAlbum.price).toBe(price);
        expect(collectorAlbum.status).toBe(status);
      }
    );
    const req = httpMock.expectOne(collectorUrl + '/200/albums/100');
    expect(req.request.method).toBe("POST");
    req.flush(mockCollectorAlbum);
  });

});
