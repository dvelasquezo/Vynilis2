/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PrizeDetailComponent } from './prize-detail.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import faker from "faker";
import { Prize } from "../prize";
import { RouterTestingModule } from '@angular/router/testing';

describe('PrizeDetailComponent', () => {
  let component: PrizeDetailComponent;
  let fixture: ComponentFixture<PrizeDetailComponent>;
  let debug: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizeDetailComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeDetailComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    component.prizeDetail = new Prize(faker.random.number(),
    faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence(),
      []);
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should have a header element ", () => {
    const header = element.querySelector('#header');
    expect(header.innerHTML).toContain('Detalle premio');
  });

  it("Should have a prize detail element ", () => {
    fixture.whenStable().then(() => {
      let input = fixture.debugElement.query(By.css('prizeName'));
      let el = input.nativeElement;
      expect(el.value).toBe(component.prizeDetail.name);
      input = fixture.debugElement.query(By.css('prizeOrg'));
      el = input.nativeElement;
      expect(el.value).toBe(component.prizeDetail.organization);
      input = fixture.debugElement.query(By.css('prizeDesc'));
      el = input.nativeElement;
      expect(el.value).toBe(component.prizeDetail.description);
    });
  });

});
