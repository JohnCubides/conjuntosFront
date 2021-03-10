import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedsModule } from 'src/app/shareds/shareds.module';
import { ApiService } from 'src/app/core/https/http.service';
import { AdminIndepedenetUserUnitsRoutingModule } from './admin-independet-user-units-routing.module';
import { AdminUsersUnitsComponent } from './pages/admin-users-units/admin-users-units.component';
import { FormUnitUsersComponent } from './utils/form-unit-users/form-unit-users.component';
import { ConsultComponent } from './pages/consult/consult.component';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateComponent } from './pages/create/create.component';
import { ModifyComponent } from './pages/modify/modify.component';

@NgModule({
  declarations: [
    AdminUsersUnitsComponent,
    FormUnitUsersComponent,
    ConsultComponent,
    CreateComponent,
    ModifyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    AdminIndepedenetUserUnitsRoutingModule
  ],
  providers: [
    ApiService
  ]
})
export class AdminIndependentUserUnitsModule { }
