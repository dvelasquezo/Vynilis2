/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumDetalleComponent } from './album-detalle.component';
import { DebugElement } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Album } from "../album";
import faker from "faker";
import { RouterTestingModule } from '@angular/router/testing';

describe('AlbumDetalleComponent', () => {
  let component: AlbumDetalleComponent;
  let fixture: ComponentFixture<AlbumDetalleComponent>;
  let element: HTMLElement;
  let debug: DebugElement;

  let albumDetalle: Album;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumDetalleComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const id: number = 10;
    const name: string = faker.lorem.sentence();
    const cover: string = faker.image.imageUrl();
    const releaseDate: any = faker.date.past();
    const description: string = faker.lorem.sentence();
    const genre: string = faker.lorem.sentence();
    const recordLabel: string = faker.lorem.sentence();
    albumDetalle =
      new Album(
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

    fixture = TestBed.createComponent(AlbumDetalleComponent);
    component = fixture.componentInstance;
    component.albumDetalle = albumDetalle;
    element = fixture.nativeElement;
    debug = fixture.debugElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it("Should have an Title element ", () => {
    const titulo = element.querySelector('#titulo');
    expect(titulo.innerHTML).toContain('Detalle');
  });

});





