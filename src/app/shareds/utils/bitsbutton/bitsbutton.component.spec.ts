import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitsbuttonComponent } from './bitsbutton.component';

describe('BitsbuttonComponent', () => {
  let component: BitsbuttonComponent;
  let fixture: ComponentFixture<BitsbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitsbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitsbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
