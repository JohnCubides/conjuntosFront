import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatefilterComponent } from './statefilter.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedsModule } from '../shareds.module';

describe('StatefilterComponent', () => {
  let component: StatefilterComponent;
  let fixture: ComponentFixture<StatefilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StatefilterComponent
      ],
      imports: [
        HttpClientTestingModule,
        SharedsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
