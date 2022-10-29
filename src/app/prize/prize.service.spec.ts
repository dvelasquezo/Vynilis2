/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { PrizeService } from './prize.service';

import { HttpTestingController,
  HttpClientTestingModule } from "@angular/common/http/testing";

import faker from "faker";
import { Prize } from "./prize";
import { environment } from "../../environments/environment";

describe('Service: Prize', () => {
  let injector: TestBed;
  let service: PrizeService;
  let httpMock: HttpTestingController;
  let apiUrl = environment.baseUrl + "prizes";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PrizeService]
    });
    injector = getTestBed();
    service = injector.get(PrizeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("getPrizes() should return 10 records", () => {
    let mockPosts: Prize[] = [];
    for (let i = 1; i < 11; i++) {
      let prize = new Prize(i, faker.lorem.sentence(),
       faker.lorem.sentence(), faker.lorem.sentence(), null);
      mockPosts.push(prize);
    }
    console.log(mockPosts.length);
    service.getPrizes().subscribe((prizes) => {
      expect(prizes.length).toBe(10);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockPosts);
  });

  it("getPrize(101) should find a prize", () => {
    let mockPrize: Prize = new Prize(101, 'Univisión','Premios lo Nuestro',
     '', []);
    service.getPrize(101).subscribe((prize) => {
      expect(prize.id).toBe(101);
      expect(prize.organization).toBe('Univisión');
      expect(prize.name).toBe('Premios lo Nuestro');
      expect(prize.performerPrizes.length).toBe(0);
    });
    const req = httpMock.expectOne(apiUrl + "/101");
    expect(req.request.method).toBe("GET");
    req.flush(mockPrize);
  });

  it("getPrize(0) should not find a prize", () => {
    let mockPrize: Prize = null;
    service.getPrize(101).subscribe((prize) => {
      expect(prize).toBe(null);
    });
    const req = httpMock.expectOne(apiUrl + "/101");
    expect(req.request.method).toBe("GET");
    req.flush(mockPrize);
  });

  it("createPrize() should work", () => {
    let mockPrize: Prize = new Prize(null, faker.lorem.sentence(),
      faker.lorem.sentence(), faker.lorem.sentence(), null);
    service.createPrize(mockPrize).subscribe(prize => {
      expect(prize.id).toBe(null);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("POST");
    req.flush(mockPrize);
  });

});
