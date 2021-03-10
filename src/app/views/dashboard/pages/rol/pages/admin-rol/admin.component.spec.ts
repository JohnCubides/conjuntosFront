// import { Then } from 'cucumber';
// import { ModalService } from 'src/app/core/services/modal.service';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Router } from '@angular/router';
// import { ApiService } from 'src/app/core/https/http.service';
// import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
// import { AdminRolComponent } from './admin-rol.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { ReactiveFormsModule } from '@angular/forms';
// import { SharedsModule } from 'src/app/shareds/shareds.module';
// import { FilterRolComponent } from '../../utils/filter-rol/filter-rol.component';
// import { StoreModule } from '@ngrx/store';


// describe('AdminRolComponent', () => {
//   let component: AdminRolComponent;
//   let fixture: ComponentFixture<AdminRolComponent>;
//   let apiServiceMock: ApiService;
//   let modalServiceMock: ModalService;
//   let spyGetApiService;
//   let spyDeleteApiService;
//   let spyPutApiService;
//   let roleId: number;
//   let state: boolean;
//   const RESPONSE_FAILED = 'error';
//   const RESPONSE_SUCCESS = 'success';
//   const responseAllRoleServiceMock = {
//     list: [
//       {
//         description: 'Administrador2',
//         state: true,
//         users: null,
//         id: 1,
//         created: '2020-03-31T15:27:02.286088',
//         isDeleted: false
//       }
//     ],
//     pagination: {
//       page: 1,
//       quantityToShow: 10,
//       totalPages: 1,
//       totalData: 10
//     }
//   };

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         AdminRolComponent,
//         FilterRolComponent
//       ],
//       imports: [
//         ReactiveFormsModule,
//         MatIconModule,
//         MatFormFieldModule,
//         HttpClientTestingModule,
//         RouterTestingModule,
//         SharedsModule,
//         StoreModule.forRoot({}),
//       ],
//       providers: [
//         ApiService
//       ]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AdminRolComponent);
//     component = fixture.componentInstance;
//     apiServiceMock = TestBed.inject(ApiService);
//     modalServiceMock = TestBed.inject(ModalService);
//     TestBed.inject(Router);
//     spyGetApiService = spyOn(apiServiceMock, 'get');
//     spyDeleteApiService = spyOn(apiServiceMock, 'delete');
//     spyPutApiService = spyOn(apiServiceMock, 'put');
//     spyGetApiService.and.returnValue(Promise.resolve(responseAllRoleServiceMock));
//     fixture.detectChanges();
//     component.dataOriginal = responseAllRoleServiceMock.list;
//   });

//   it('should get all roles', async () => {
//     spyGetApiService.calls.mostRecent().returnValue.then(() => {
//       fixture.detectChanges();
//       expect(component.paginator.page).toEqual(responseAllRoleServiceMock.pagination.page);
//     });
//   });

//   xit('should get roles that match keyword', async () => {
//     component.keywordRole = 'adm';
//     spyGetApiService.and.returnValue(Promise.resolve([responseAllRoleServiceMock.list[0]]));
//     component.getRoleWithKeyword();
//     spyGetApiService.calls.mostRecent().returnValue.then(() => {
//       fixture.detectChanges();
//       expect(component.data.length).toBeGreaterThan(0);
//     });
//   });

//   it('should change role status', async () => {
//     component['modalDeleteChanges'](1, true);
//     spyPutApiService.and.returnValue(Promise.resolve('succes'));
//     // component.changeRoleStatus();
//     // spyPutApiService.calls.mostRecent().returnValue.then(() => {
//     //   fixture.detectChanges();
//     //   expect(component.modal.actionModal).toEqual(RESPONSE_SUCCESS);
//     //   // done();
//     // });
//   });

//   // xit('should not change role status', (done) => {
//   //   roleId = 1;
//   //   state = false;
//   //   spyOn(modalServiceMock, 'openModal').and.returnValue();
//   //   component.modalChageStatus(roleId, state);
//   //   spyPutApiService.and.returnValue(Promise.reject('error'));
//   //   component.changeRoleStatus();
//   //   fixture.detectChanges();
//   //   spyPutApiService.calls.mostRecent().returnValue.then().catch(() => {
//   //     fixture.detectChanges();
//   //     expect(component.modal.actionModal).toEqual(RESPONSE_FAILED);
//   //     done();
//   //   });
//   // });

//   // it('should delete role', async (done) => {
//   //   roleId = 1;
//   //   component.modalDelete(roleId);
//   //   spyDeleteApiService.and.returnValue(Promise.resolve({ status: 200 }));
//   //   component.deleteRol();
//   //   spyDeleteApiService.calls.mostRecent().returnValue.then((result) => {
//   //     fixture.detectChanges();
//   //     expect(component.modal.actionModal).toEqual(RESPONSE_SUCCESS);
//   //     done();
//   //   });
//   // });

//   // xit('should not delete role', (done) => {
//   //   roleId = 1;
//   //   spyOn(modalServiceMock, 'openModal').and.returnValue();
//   //   component.modalDelete(roleId);
//   //   spyDeleteApiService.and.returnValue(Promise.reject());
//   //   component.deleteRol();
//   //   spyDeleteApiService.calls.mostRecent().returnValue.then().catch(() => {
//   //     fixture.detectChanges();
//   //     expect(component.modal.actionModal).toEqual(RESPONSE_FAILED);
//   //     done();
//   //   });
//   // });
// });
