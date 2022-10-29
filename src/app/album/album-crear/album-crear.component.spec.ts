import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AlbumCrearComponent } from './album-crear.component';

describe('AlbumCrearComponent', () => {
  let component: AlbumCrearComponent;
  let fixture: ComponentFixture<AlbumCrearComponent>;

  beforeEach(() => {
    const albumServiceStub = () => ({
      createAlbum: albumC => ({ subscribe: f => f({}) })
    });
    const formBuilderStub = () => ({ group: object => ({}) });
    const toastrServiceStub = () => ({
      success: string => ({}),
      error: (err, string) => ({}),
      warning: (string, string1) => ({})
    });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AlbumCrearComponent],
      providers: [
        { provide: AlbumService, useFactory: albumServiceStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: ToastrService, useFactory: toastrServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(AlbumCrearComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('createAlbum', () => {
    it('makes expected calls', () => {
      const albumServiceStub: AlbumService = fixture.debugElement.injector.get(
        AlbumService
      );
      const albumStub: Album = <any>{};
      const toastrServiceStub: ToastrService = fixture.debugElement.injector.get(
        ToastrService
      );
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(albumServiceStub, 'createAlbum').and.callThrough();
      spyOn(toastrServiceStub, 'success').and.callThrough();
      spyOn(toastrServiceStub, 'error').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      component.createAlbum(albumStub);
      expect(albumServiceStub.createAlbum).toHaveBeenCalled();
      expect(toastrServiceStub.success).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
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
