import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEstateUnitsComponent } from './update-estate-units.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { ApiService } from 'src/app/core/https/http.service';


describe('UpdateEstateUnitsComponent', () => {
  let component: UpdateEstateUnitsComponent;
  let fixture: ComponentFixture<UpdateEstateUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateEstateUnitsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        StoreModule.forRoot({}),
        RouterModule.forRoot([]),
      ],
      providers: [
        ApiService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEstateUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
