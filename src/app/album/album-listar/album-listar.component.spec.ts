import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AlbumService } from '../album.service';
import { AlbumListarComponent } from './album-listar.component';

describe('AlbumListarComponent', () => {
  let component: AlbumListarComponent;
  let fixture: ComponentFixture<AlbumListarComponent>;

  beforeEach(() => {
    const albumServiceStub = () => ({
      getAlbums: () => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AlbumListarComponent],
      providers: [{ provide: AlbumService, useFactory: albumServiceStub }]
    });
    fixture = TestBed.createComponent(AlbumListarComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`selected has default value`, () => {
    expect(component.selected).toEqual(false);
  });

  describe('getAlbums', () => {
    it('makes expected calls', () => {
      const albumServiceStub: AlbumService = fixture.debugElement.injector.get(
        AlbumService
      );
      spyOn(albumServiceStub, 'getAlbums').and.callThrough();
      component.getAlbums();
      expect(albumServiceStub.getAlbums).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getAlbums').and.callThrough();
      component.ngOnInit();
      expect(component.getAlbums).toHaveBeenCalled();
    });
  });
});
