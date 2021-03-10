import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEstateUnitComponent } from './create-estate-unit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/core/https/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';

describe('CreateEstateUnitComponent', () => {
  let component: CreateEstateUnitComponent;
  let fixture: ComponentFixture<CreateEstateUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEstateUnitComponent],
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
    fixture = TestBed.createComponent(CreateEstateUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
