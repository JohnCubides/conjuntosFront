import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEstateUnitsComponent } from './manager-estate-units.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from 'src/app/core/https/http.service';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManagerEstateUnitsComponent', () => {
  let component: ManagerEstateUnitsComponent;
  let fixture: ComponentFixture<ManagerEstateUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ManagerEstateUnitsComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        ApiService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerEstateUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
