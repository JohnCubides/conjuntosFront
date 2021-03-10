import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerGroupingsCreateComponent } from './manager-groupings-create.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/core/https/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';

describe('ManagerGroupingsCreateComponent', () => {
  let component: ManagerGroupingsCreateComponent;
  let fixture: ComponentFixture<ManagerGroupingsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerGroupingsCreateComponent ],
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
    fixture = TestBed.createComponent(ManagerGroupingsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
