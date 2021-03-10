import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultEstateUnitComponent } from './consult-estate-unit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/core/https/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';

describe('CreateEstateUnitComponent', () => {
  let component: ConsultEstateUnitComponent;
  let fixture: ComponentFixture<ConsultEstateUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultEstateUnitComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        ApiService
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultEstateUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
