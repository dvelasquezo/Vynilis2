/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MusicianCreateComponent } from './musician-create.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateMusicianRequest, MusicianService } from '../musician.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

describe('MusicianCreateComponent', () => {
  let fixture: ComponentFixture<MusicianCreateComponent>;
  let element: HTMLElement;
  let mockMusicianService, mockToastrService, mockRouter;
  // let musicians: Musician[];

  beforeEach(async(() => {
    mockMusicianService = jasmine.createSpyObj(['createMusician']);
    mockMusicianService.createMusician.and.returnValue({ subscribe: (callBack) => { callBack(); } });
    mockToastrService = jasmine.createSpyObj(['success', 'error']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule],
      declarations: [MusicianCreateComponent],
      providers: [
        FormBuilder,
        { provide: MusicianService, useValue: mockMusicianService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(MusicianCreateComponent);
  }));

  it("OnInit should show form with controls", () => {
    fixture.detectChanges();

    let inputs: NodeList = fixture.nativeElement.querySelectorAll('input');
    expect(inputs.length).toBe(4);
    expect(fixture.nativeElement.querySelector('input#name')).not.toBeFalsy();
    expect(fixture.nativeElement.querySelector('input#image')).not.toBeFalsy();
    expect(fixture.nativeElement.querySelector('input#description')).not.toBeFalsy();
    expect(fixture.nativeElement.querySelector('input#birthDate')).not.toBeFalsy();

    let buttons: NodeList = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(2);
  });

  it("createMusician should make the right calls to other services", () => {
    fixture.detectChanges();
    fixture.componentInstance.createMusician(new CreateMusicianRequest());

    expect(mockMusicianService.createMusician).toHaveBeenCalled();
    expect(mockToastrService.success).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
