/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PrizesListComponent } from './prizes-list.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import faker from "faker";
import { Prize } from "../prize";
import { RouterTestingModule } from '@angular/router/testing';
// import { FormBuilder } from '@angular/forms';

describe('PrizesListComponent', () => {
  let component: PrizesListComponent;
  let fixture: ComponentFixture<PrizesListComponent>;
  let debug: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizesListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizesListComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    component.prizes = [new Prize(1, faker.lorem.sentence(),
       faker.lorem.sentence(), faker.lorem.sentence(),
      []),];
    component.selected = false;
    component.create = false;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should have an titulo element ", () => {
    const titulo = element.querySelector('#titulo');
    expect(titulo.innerHTML).toContain('Premios');
  });

  it("Should have a prize element ", () => {
    const prize = element.querySelector('#prize1');
    expect(prize.innerHTML).toContain(component.prizes[0].name);
  });

});
