import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AlbumService } from '../album.service';
import { CollectorAlbum } from '../album-collector/collector-album';
import { AlbumCollectorComponent } from './album-collector.component';

describe('AlbumCollectorComponent', () => {
  let component: AlbumCollectorComponent;
  let fixture: ComponentFixture<AlbumCollectorComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: object => ({}) });
    const toastrServiceStub = () => ({
      success: (string, arg, object) => ({}),
      error: (string, arg, object) => ({})
    });
    const activatedRouteStub = () => ({
      snapshot: { paramMap: { get: () => ({}) } }
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const albumServiceStub = () => ({
      asociarColeccionista: (selected, albumId, collector) => ({
        subscribe: f => f({})
      }),
      getCollectors: () => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AlbumCollectorComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: ToastrService, useFactory: toastrServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: AlbumService, useFactory: albumServiceStub }
      ]
    });
    fixture = TestBed.createComponent(AlbumCollectorComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('agregarCollecionista', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const albumServiceStub: AlbumService = fixture.debugElement.injector.get(
        AlbumService
      );
      const collectorAlbumStub: CollectorAlbum = <any>{};
      collectorAlbumStub.collector = <any>{};
      collectorAlbumStub.collector.name = <any>{};
      collectorAlbumStub.album = <any>{};
      collectorAlbumStub.album.name = <any>{};
      collectorAlbumStub.id = <any>{};
      spyOn(component, 'showSuccess').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(albumServiceStub, 'asociarColeccionista').and.callThrough();
      component.agregarCollecionista(collectorAlbumStub);
      expect(component.showSuccess).toHaveBeenCalled();
      // expect(albumServiceStub.asociarColeccionista).toHaveBeenCalled();
    });
  });

  describe('showSuccess', () => {
    it('makes expected calls', () => {
      const toastrServiceStub: ToastrService = fixture.debugElement.injector.get(
        ToastrService
      );
      const collectorAlbumStub: CollectorAlbum = <any>{};
      collectorAlbumStub.collector = <any>{};
      collectorAlbumStub.collector.name = <any>{};
      collectorAlbumStub.album = <any>{};
      collectorAlbumStub.album.name = <any>{};
      spyOn(toastrServiceStub, 'success').and.callThrough();
      component.showSuccess(collectorAlbumStub);
      expect(toastrServiceStub.success).toHaveBeenCalled();
    });
  });

  describe('cancelarOperacion', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.cancelarOperacion();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('ngAfterContentChecked', () => {
    it('makes expected calls', () => {
      const albumServiceStub: AlbumService = fixture.debugElement.injector.get(
        AlbumService
      );
      spyOn(albumServiceStub, 'getCollectors').and.callThrough();
      component.ngAfterContentChecked();
      expect(albumServiceStub.getCollectors).toHaveBeenCalled();
    });
  });
});
