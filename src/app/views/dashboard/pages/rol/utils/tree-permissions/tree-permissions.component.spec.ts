import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TreePermissionsComponent } from './tree-permissions.component';
import { TreePermissions } from 'src/app/core/models/tree-permissions/tree-permissions';
import { SharedsModule } from 'src/app/shareds/shareds.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TreePermissionsComponent', () => {
  let component: TreePermissionsComponent;
  let fixture: ComponentFixture<TreePermissionsComponent>;
  const json: TreePermissions = {
    id: 0,
    name: 'Configuracion',
    // state: false,
    sonsPermits: [
      {
        id: 1,
        name: 'Unidades Inmobiliarias',
        state: false,
        sonsPermits: [
          {
            id: 12,
            name: 'Crear',
            state: false
          },
          {
            id: 13,
            name: 'Modificar',
            state: true
          },
          {
            id: 14,
            name: 'Consultar',
            state: false,
            sonsPermits: [
              {
                id: 141,
                name: 'Crear',
                state: false
              },
              {
                id: 142,
                name: 'Modificar'
              }
            ]
          }
        ]
      }
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TreePermissionsComponent
      ],
      imports: [
        SharedsModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(TreePermissionsComponent);
    component = fixture.componentInstance;
    component.nodePermits = json;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Execute', () => {
    it('nodesListMain', () => {
      expect(component.nodesListMain).toEqual(json);
    });
    it('addIdElementNode', () => {
      expect(component.addIdElementNode(1)).toEqual('1');
    });
    it('Value node grandfather', () => {
      expect(component.nodesListMain.state).toBeFalse();
    });
    describe('execute metod private', () => {
      it('changeStateForNode', () => {
        const node = component.nodesListMain;
        component['changeStateForNode']('0002');
        expect(node.sonsPermits[0].state).toBeTrue();
      });
    });
    describe('changesStateToggleSwich', () => {
      beforeEach(() => {
        component.changesStateToggleSwich(!component.nodesListMain.state, component.nodesListMain.sonsPermits[0]);
      });

      it('Node Grandfather', () => {
        expect(component.nodesListMain.state).toBeTrue();
      });

      it('Node Father', () => {
        const node = component.nodesListMain.sonsPermits[0];
        component.changesStateToggleSwich(!node.state, node);
        expect(node.sonsPermits[0].state).toEqual(node.state);
      });

      it('Node Father', () => {
        const node = component.nodesListMain.sonsPermits[0];
        component.changesStateToggleSwich(node.state, node);
        expect(component.nodesListMain.sonsPermits[0].sonsPermits[1].state).toEqual(node.state);
      });
    });
  });
});
