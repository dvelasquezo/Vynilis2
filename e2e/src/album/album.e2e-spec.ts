import { AbumPage } from './album.po';
import { browser, by, element } from 'protractor';

describe('test Album', () => {
  let page: AbumPage;

  beforeEach(() => {
    page = new AbumPage();
  });

  it('H01 list post nav', () => {
    page.navigateTo();
    element(by.id('albums-navbar-item')).click().then(function () {
      expect(element(by.id('titulo')).getText()).toBe("Álbumes");
      expect(element(by.id('crearAlbum')).getText()).toBe("Crear Album")
    })
  });

  it('H02 detail post nav', () => {
    page.navigateTo();
    element(by.id('albums-navbar-item')).click();
    element(by.css('.btn.btn-link.text-dark')).click().then(function () {
      expect(element(by.id('titulo')).getText()).toBe("Detalle");
    });
  });

  it('H09 create post nav', () => {
    page.navigateTo();
    element(by.id('albums-navbar-item')).click();
    element(by.id('crearAlbum')).click().then(function () {
      expect(element(by.id('titulo')).getText()).toBe("Crear");
      expect(element(by.id('labelNombre')).getText()).toBe("Nombre");
      expect(element(by.id('labelCover')).getText()).toBe("Cover");
      expect(element(by.id('labelFecha')).getText()).toBe("Fecha Lanzamiento");
      expect(element(by.id('labelDescripcion')).getText()).toBe("Descripción");
      expect(element(by.id('labelGenero')).getText()).toBe("Genero");
      expect(element(by.id('labelCasa')).getText()).toBe("Casa Discográfica");
    });
  });

  it('H10 create track for albums nav', () => {
    page.navigateTo();
    element(by.id('albums-navbar-item')).click();
    element(by.css('.btn.btn-link.text-dark')).click()
    element(by.id('verTrackId')).click().then(function () {
      expect(element(by.id('tituloCanciones')).getText()).toBe("Canciones");
    })
    element(by.id('botonCrearTrack')).click().then(function(){
      expect(element(by.id('titulo')).getText()).toBe("Track");
      expect(element(by.id('labelNombre')).getText()).toBe("Nombre");
      expect(element(by.id('labelDuracion')).getText()).toBe("Duración");
    })
  });

  afterEach(async () => {

  });
});
