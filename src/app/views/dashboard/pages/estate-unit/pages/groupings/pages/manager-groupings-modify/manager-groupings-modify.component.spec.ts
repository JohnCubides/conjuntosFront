import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerGroupingsModifyComponent } from './manager-groupings-modify.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/core/https/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';

describe('ManagerGroupingsModifyComponent', () => {
  let component: ManagerGroupingsModifyComponent;
  let fixture: ComponentFixture<ManagerGroupingsModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerGroupingsModifyComponent ],
      imports:[
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ],
      providers:[ApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerGroupingsModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
