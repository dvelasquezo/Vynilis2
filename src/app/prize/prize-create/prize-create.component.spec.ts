import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Prize } from '../prize';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PrizeService } from '../prize.service';
import { ToastrService } from 'ngx-toastr';
import { PrizeCreateComponent } from './prize-create.component';

describe('PrizeCreateComponent', () => {
  let component: PrizeCreateComponent;
  let fixture: ComponentFixture<PrizeCreateComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: object => ({}) });
    const activatedRouteStub = () => ({});
    const routerStub = () => ({});
    const prizeServiceStub = () => ({
      createPrize: newPrize => ({ subscribe: f => f({}) })
    });
    const toastrServiceStub = () => ({
      error: (string, arg, object) => ({}),
      success: (string, arg, object) => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PrizeCreateComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: PrizeService, useFactory: prizeServiceStub },
        { provide: ToastrService, useFactory: toastrServiceStub }
      ]
    });
    fixture = TestBed.createComponent(PrizeCreateComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('createPrize', () => {
    it('makes expected calls', () => {
      const prizeStub: Prize = <any>{};
      const prizeServiceStub: PrizeService = fixture.debugElement.injector.get(
        PrizeService
      );
      spyOn(component, 'showSuccess').and.callThrough();
      spyOn(component, 'showError').and.callThrough();
      spyOn(prizeServiceStub, 'createPrize').and.callThrough();
      component.createPrize(prizeStub);
      expect(component.showSuccess).toHaveBeenCalled();
      expect(prizeServiceStub.createPrize).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.ngOnInit();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });
});
