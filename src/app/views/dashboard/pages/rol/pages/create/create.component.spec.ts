import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreateComponent } from './create.component';
import { TreePermissionsComponent } from '../../utils/tree-permissions/tree-permissions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/core/https/http.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { doesNotReject } from 'assert';
import { ModalService } from 'src/app/core/services/modal.service';
import { SharedsModule } from 'src/app/shareds/shareds.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormRolComponent } from '../../utils/form-rol/form-rol.component';
import { StoreModule } from '@ngrx/store';

describe('Test for create rol and permits', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let apiService: ApiService;
  let modalService: ModalService;
  let spyGetApiService: any;
  let spyPostApiService: any;
  const USER_EXIST = 'THE_ROLE_ALREADY_EXISTS';
  const SUCCESS_CREATE = 'ROLE_CREATE_SUCCESSFULL';
  const mockRol = {
    data: null,
    isSuccess: true,
    message: 'THE_ROLE_ALREADY_EXISTS'
  };
  const mockRol1 = {
    id: 1,
    name: 'Aministrator',
    permits: [1, 2, 5]
  };
  const mockUser = {
    data: [
      {
        id: 0,
        name: 'Configuracion'
      },
      {
        id: 1,
        name: 'Configuracion 2'
      }
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateComponent,
        FormRolComponent,
        TreePermissionsComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        RouterTestingModule,
        SharedsModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        ApiService,
        ModalService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    apiService = TestBed.inject(ApiService);
    modalService = TestBed.inject(ModalService);
    component = fixture.componentInstance;
    spyGetApiService = spyOn(apiService, 'get').and.returnValue(Promise.resolve(mockUser));
    spyPostApiService = spyOn(apiService, 'post').and.returnValue(Promise.resolve(mockRol));
    fixture.detectChanges();
  });

  it('Should create component Create Rol', () => {
    expect(component).toBeTruthy();
  });
  describe('Should Validate service', () => {

    it('Get Data', async () => {
      spyGetApiService.calls.mostRecent().returnValue.then(() => {
        expect(component.jsonRol.permits.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe('Post', () => {
      beforeEach(() => {
        const sendRol = { name: 'Aministrator', permits: [1, 2, 5] };
        component.sendPermits(sendRol);
      });

      it('for message unsuccessfully for error', (done) => {
        const obj = { error: { text: 'THE_ROLE_ALREADY_EXISTS' } };
        const sendRol = { name: 'Aministrator', permits: [1, 2, 5] };
        spyPostApiService.and.returnValue(Promise.reject(obj));
        component.sendPermits(sendRol);
        spyPostApiService.calls.mostRecent().returnValue.then().catch(() => {
          expect(component.errorMensagge).toEqual(USER_EXIST);
          done();
        });
      });

      it('for message unsuccessfully', async () => {
        spyPostApiService.calls.mostRecent().returnValue.then(() => {
          expect(component.errorMensagge).toEqual(USER_EXIST);
          component.errorRol();
          expect(component.errorMensagge).toEqual('');
        });
      });

      it('for message success', async () => {
        spyPostApiService.calls.mostRecent().returnValue.then(() => {
          component['menssageResult'](mockRol1);
          expect(component.modal.message).toEqual(SUCCESS_CREATE);
        });
      });
    });
  });
});
