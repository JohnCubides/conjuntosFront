import { TestBed } from '@angular/core/testing';

import { JwtService } from './jwt.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../../https/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        })
      ],
      providers: [
        JwtHelperService,
        ApiService
      ]
    });
    service = TestBed.inject(JwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
