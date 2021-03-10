import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalLayoutComponent } from './principal-layout.component';

describe('PrincipalLayoutComponent', () => {
  let component: PrincipalLayoutComponent;
  let fixture: ComponentFixture<PrincipalLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
