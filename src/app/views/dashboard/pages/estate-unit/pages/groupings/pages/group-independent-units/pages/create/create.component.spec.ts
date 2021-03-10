import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { ApiService } from 'src/app/core/https/http.service';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [CreateComponent],
        imports: [
            HttpClientTestingModule,
            RouterTestingModule,
            ReactiveFormsModule,
            FormsModule,
            StoreModule.forRoot({}),
        ],
        providers: [
            ApiService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
