import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIndependentUnitComponent } from './form-independent-unit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { ApiService } from 'src/app/core/https/http.service';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/shareds/shareds.module';
import { HttpClient } from '@angular/common/http';

describe('FormIndependentUnitComponent', () => {
  let component: FormIndependentUnitComponent;
  let fixture: ComponentFixture<FormIndependentUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [FormIndependentUnitComponent],
        imports: [
            HttpClientTestingModule,
            RouterTestingModule,
            ReactiveFormsModule,
            FormsModule,
            StoreModule.forRoot({}),
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: httpTranslateLoader,
                    deps: [HttpClient]
                }
            })
        ],
        providers: [
            ApiService,
            TranslateService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIndependentUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
