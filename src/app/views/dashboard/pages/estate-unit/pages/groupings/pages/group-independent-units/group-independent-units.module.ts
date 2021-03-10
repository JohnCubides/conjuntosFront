import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedsModule } from 'src/app/shareds/shareds.module';
import { ApiService } from 'src/app/core/https/http.service';
import { GroupIndepedenetUnitsRoutingModule } from './group-independet-units-routing.module';
import { AdminIndependentUnitsComponent } from './pages/admin-independent-units/admin-independent-units.component';
import { CreateComponent } from './pages/create/create.component';
import { FormIndependentUnitComponent } from './utils/form-independent-unit/form-independent-unit.component';
import { ModifyComponent } from './pages/modify/modify.component';


@NgModule({
  declarations: [
    AdminIndependentUnitsComponent,
    CreateComponent,
    FormIndependentUnitComponent,
    ModifyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedsModule,
    GroupIndepedenetUnitsRoutingModule,
  ],
  providers: [
    ApiService
  ]
})
export class GroupIndependentUnitsModule { }
