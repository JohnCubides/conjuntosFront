import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRolComponent } from './pages/admin-rol/admin-rol.component';
import { RolRoutingModule } from './rol-routing.module';
import { CreateComponent } from './pages/create/create.component';
import { TreePermissionsComponent } from './utils/tree-permissions/tree-permissions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRolComponent } from './utils/form-rol/form-rol.component';
import { ModifyComponent } from './pages/modify/modify.component';
import { ConsultComponent } from './pages/consult/consult.component';
import { SharedsModule } from 'src/app/shareds/shareds.module';
import { ApiService } from 'src/app/core/https/http.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
//import { CanDeactivateGuard } from 'src/app/shareds/form-validate/can-deactivate.guard';

@NgModule({
  declarations: [
    AdminRolComponent,
    CreateComponent,
    TreePermissionsComponent,
    FormRolComponent,
    ModifyComponent,
    ConsultComponent,
  ],
  imports: [
    CommonModule,
    RolRoutingModule,
    ReactiveFormsModule,
    SharedsModule,
    MatIconModule,
    MatFormFieldModule
  ],
  providers: [
    ApiService,
    //CanDeactivateGuard
  ]
})
export class RolModule { }
