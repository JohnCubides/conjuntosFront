/*import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyComponent } from './modify.component';
import { TreePermissionsComponent } from '../../utils/tree-permissions/tree-permissions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from 'src/app/core/https/http.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalService } from 'src/app/core/services/modal.service';
import { SharedsModule } from 'src/app/shareds/shareds.module';
import { StoreModule } from '@ngrx/store';

describe('Test for modify rol and permits', () => {
  let component: ModifyComponent;
  let fixture: ComponentFixture<ModifyComponent>;
  let apiService: ApiService;
  let modalService: ModalService;
  let spyPostApiService: any;
  let spyPutApiService: any;
  const sendRol = { name: 'Aministrator', permits: [1, 2, 5] };
  const mockRol = {
    data: { idRol: 1, name: 'Administrador', permits: []},
    isSuccess: true,
    message: 'ROLE_UPDATE_SUCCESSFULL'
  };
  const mockRol1 = {
    data: null,
    isSuccess: true,
    message: 'THE_ROLE_ALREADY_EXISTS'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModifyComponent,
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
    fixture = TestBed.createComponent(ModifyComponent);
    apiService = TestBed.inject(ApiService);
    modalService = TestBed.inject(ModalService);
    spyPostApiService = spyOn(apiService, 'post');
    spyPutApiService = spyOn(apiService, 'put');
    spyOn(modalService, 'openModal').and.returnValue();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the saved role', async () => {
    spyPostApiService.and.returnValue(Promise.resolve(mockRol));
    component.ngOnInit();
    spyPostApiService.calls.mostRecent().returnValue.then(() => {
      expect(component.jsonRol.idRol).toEqual(mockRol.data.idRol);
    });
  });

  describe('should send Permits', () => {

    it('for message unsuccessfully for error', (done) => {
      const obj = { status: 400 };
      const sendRol = { name: 'Aministrator', permits: [1, 2, 5] };
      spyPutApiService.and.returnValue(Promise.reject(obj));
      component.sendPermits(sendRol);
      spyPutApiService.calls.mostRecent().returnValue.then().catch(() => {
        expect(component.errorMensagge).toEqual(mockRol1.message);
        done();
      });
    });

    it('for message unsuccessfully for error and then clean the variable errorMensagge', (done) => {
      const obj = { status: 400 };
      const sendRol = { name: 'Aministrator', permits: [1, 2, 5] };
      spyPutApiService.and.returnValue(Promise.reject(obj));
      component.sendPermits(sendRol);
      spyPutApiService.calls.mostRecent().returnValue.then().catch(() => {
        expect(component.errorMensagge).toEqual(mockRol1.message);
        component.errorRol();
        expect(component.errorMensagge).toEqual('');
        done();
      });
    });

    it('for message success', async () => {
      const obj = { status: 204 };
      spyPutApiService.and.returnValue(Promise.resolve(null));
      component.sendPermits(sendRol);
      spyPutApiService.calls.mostRecent().returnValue.then(() => {
        expect(component.modal.message).toEqual(mockRol.message);
      });
    });

  });
});*/
