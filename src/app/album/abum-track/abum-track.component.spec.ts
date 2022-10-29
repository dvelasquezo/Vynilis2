import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AlbumService } from '../album.service';
import { Track } from '../track';
import { AbumTrackComponent } from './abum-track.component';

describe('AbumTrackComponent', () => {
  let component: AbumTrackComponent;
  let fixture: ComponentFixture<AbumTrackComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: object => ({}) });
    const toastrServiceStub = () => ({
      success: string => ({}),
      error: (err, string) => ({}),
      warning: (string, string1) => ({})
    });
    const activatedRouteStub = () => ({
      snapshot: { paramMap: { get: () => ({}) } }
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const albumServiceStub = () => ({
      asociarTrack: (arg, trackC) => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AbumTrackComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: ToastrService, useFactory: toastrServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: AlbumService, useFactory: albumServiceStub }
      ]
    });
    fixture = TestBed.createComponent(AbumTrackComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('asociarTrack', () => {
    it('makes expected calls', () => {
      const toastrServiceStub: ToastrService = fixture.debugElement.injector.get(
        ToastrService
      );
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const albumServiceStub: AlbumService = fixture.debugElement.injector.get(
        AlbumService
      );
      const trackStub: Track = <any>{};
      spyOn(toastrServiceStub, 'success').and.callThrough();
      spyOn(toastrServiceStub, 'error').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(albumServiceStub, 'asociarTrack').and.callThrough();
      component.asociarTrack(trackStub);
      expect(albumServiceStub.asociarTrack).toHaveBeenCalled();
    });
  });

  describe('cancelCreation', () => {
    it('makes expected calls', () => {
      const toastrServiceStub: ToastrService = fixture.debugElement.injector.get(
        ToastrService
      );
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(toastrServiceStub, 'warning').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      component.cancelCreation();
      expect(toastrServiceStub.warning).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
