import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRolComponent } from './form-rol.component';
import { TreePermissionsComponent } from '../tree-permissions/tree-permissions.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SharedsModule } from 'src/app/shareds/shareds.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RolAndPermissions } from 'src/app/core/models/rol-and-permissions/rol-and-permissions';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Test for FormRolComponent', () => {
  let component: FormRolComponent;
  let fixture: ComponentFixture<FormRolComponent>;
  const rolPermissions: RolAndPermissions = {
    name: '',
    permits: [
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
        FormRolComponent,
        TreePermissionsComponent
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        SharedsModule,
        MatIconModule,
        MatFormFieldModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRolComponent);
    component = fixture.componentInstance;
    component.rolPermissions = rolPermissions;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should valid is not consult', () => {
    expect(component.disabledConsult).toBeFalse();
  });
  it('should valid is consult', () => {
    component.seeView = 'consult';
    fixture.detectChanges();
    expect(component.disabledConsult).toBeTrue();
  });
  describe('should valid field rol', () => {
    it('when it has a special character', async () => {
      const rolTest = 'administra%tor';
      component.ngOnInit();
      component.formRol.patchValue({
        rol: rolTest
      });
      component.validateInput();
      expect(component.formRol.get('rol').value).not.toEqual(rolTest);
    });
    it('when you have a name with more than 30 characters', async () => {
      let rolTest = '';
      for (let i = 0; i < 33; i++) {
        rolTest += '1';
      }
      component.ngOnInit();
      component.formRol.patchValue({
        rol: rolTest.toString()
      });
      component.validateInput();
      expect(component.formRol.get('rol').value).not.toEqual(rolTest);
    });
  });
  describe('should save rol', () => {
    it('sendPermissionsAndRol', () => {
      spyOn(component.resultPermits, 'emit');
      fixture.detectChanges();
      component.sendPermissionsAndRol();
      const result = { name: '', permits: [10] };
      component.resultPermits.emit(result);
      expect(component.resultPermits.emit).toHaveBeenCalledWith(result);
    });
    describe('Save rol whith data', () => {

      beforeEach(() => {
        const pru = Object.assign({}, rolPermissions);
        pru.name = 'Administrador';
        pru.permits[0].sonsPermits = [
          {
            id: 10,
            name: 'Configuracion',
            state: true,
            sonsPermits: [
              {
                id: 11,
                name: 'Configuracion'
              },
              {
                id: 12,
                name: 'Configuracion 2'
              }
            ]
          },
          {
            id: 2,
            name: 'Configuracion 2'
          }
        ];
        component.rolPermissions = pru;
        fixture.detectChanges();
      });
      it('sendPermissionsAndRol', () => {
        spyOn(component.resultPermits, 'emit');
        fixture.detectChanges();
        component.sendPermissionsAndRol();
        const result = { name: 'Administrador', permits: [10] };
        const result2 = { name: 'Administrador', permits: component['selectsIdsPermits'](component.rolPermissions.permits) };
        component.resultPermits.emit(result);
        expect(component.resultPermits.emit).toHaveBeenCalledWith(result2);
      });
    });
  });
});
