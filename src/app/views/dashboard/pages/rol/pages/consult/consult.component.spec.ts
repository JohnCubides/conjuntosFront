import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultComponent } from './consult.component';
import { TreePermissionsComponent } from '../../utils/tree-permissions/tree-permissions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from 'src/app/core/https/http.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('ConsultComponent', () => {
  let component: ConsultComponent;
  let fixture: ComponentFixture<ConsultComponent>;
  let apiService: ApiService;
  let spyPostApiService: any;
  const mockRol = {
    data: {
      name: 'Administrador',
      permits: [
        {
          id: 0,
          name: 'Configuracion',
          state: true,
          sonsPermits: [
            {
              id: 1,
              name: 'Configuracion 1',
              state: true,
            },
            {
              id: 2,
              name: 'Configuracion 2',
              state: true,
            }
          ]
        }
      ]
    },
    isSuccess: true,
    message: 'Se han cargado correctamente los permisos'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConsultComponent,
        TreePermissionsComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        RouterTestingModule,
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
    fixture = TestBed.createComponent(ConsultComponent);
    apiService = TestBed.inject(ApiService);
    spyPostApiService = spyOn(apiService, 'post').and.returnValue(Promise.resolve(mockRol));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('get information', async () => {
    spyPostApiService.calls.mostRecent().returnValue.then(() => {
      expect(component.jsonRol).toEqual(mockRol.data);
    });
  });
});
