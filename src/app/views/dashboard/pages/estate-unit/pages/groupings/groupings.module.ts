import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerGroupingsComponent } from './pages/manager-groupings/manager-groupings.component';
import { GroupingsRoutingModule } from './groupings-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedsModule } from 'src/app/shareds/shareds.module';
import { ApiService } from 'src/app/core/https/http.service';
import { ManagerGroupingsCreateComponent } from './pages/manager-groupings-create/manager-groupings-create.component';
import { ManagerGroupingsModifyComponent } from './pages/manager-groupings-modify/manager-groupings-modify.component';
import { FormCreateComponent } from './utils/form-create/form-create.component';

@NgModule({
  declarations: [
    ManagerGroupingsComponent,
    ManagerGroupingsCreateComponent,
    ManagerGroupingsModifyComponent,
    FormCreateComponent,
  ],
  imports: [
    CommonModule,
    GroupingsRoutingModule,
    ReactiveFormsModule,
    SharedsModule
  ],
  providers: [
    ApiService
  ]
})
export class GroupingsModule { }
