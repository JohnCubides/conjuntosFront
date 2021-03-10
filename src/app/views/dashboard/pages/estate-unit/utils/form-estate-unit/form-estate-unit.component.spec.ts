import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEstateUnitComponent } from './form-estate-unit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/core/https/http.service';
import { SharedsModule } from 'src/app/shareds/shareds.module';
import { PhoneNumberSuffix } from 'src/app/core/pipes/phoneNumberSuffix';
import { PhoneNumberPreffix } from 'src/app/core/pipes/phoneNumberPreffix';

describe('FormEstateUnitComponent', () => {
  let component: FormEstateUnitComponent;
  let fixture: ComponentFixture<FormEstateUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEstateUnitComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        StoreModule.forRoot({}),
        SharedsModule
      ],
      providers: [
        ApiService,
        PhoneNumberSuffix,
        PhoneNumberPreffix
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEstateUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
