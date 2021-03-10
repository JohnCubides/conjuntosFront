import { FormIndependentUnitComponent } from './../../utils/form-independent-unit/form-independent-unit.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyComponent } from './modify.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { ApiService } from 'src/app/core/https/http.service';

describe('ModifyComponent', () => {
  let component: ModifyComponent;
  let fixture: ComponentFixture<ModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ModifyComponent],
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
    fixture = TestBed.createComponent(ModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
