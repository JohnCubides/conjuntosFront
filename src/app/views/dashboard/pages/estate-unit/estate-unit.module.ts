import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/core/https/http.service';
import { EstateUnitRoutingModule } from './estate-unit-routing.module';
import { CreateEstateUnitComponent } from './pages/create-estate-unit/create-estate-unit.component';
import { SharedsModule } from 'src/app/shareds/shareds.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ManagerEstateUnitsComponent } from './pages/manager-estate-units/manager-estate-units.component';
import { FormEstateUnitComponent } from './utils/form-estate-unit/form-estate-unit.component';
import { ConsultEstateUnitComponent } from './pages/consult-estate-unit/consult-estate-unit.component';
import { PhoneNumberPreffix } from 'src/app/core/pipes/phoneNumberPreffix';
import { PhoneNumberSuffix } from 'src/app/core/pipes/phoneNumberSuffix';
import { UpdateEstateUnitsComponent } from './pages/update-estate-units/update-estate-units.component';


@NgModule({
  declarations: [
    CreateEstateUnitComponent,
    ManagerEstateUnitsComponent,
    FormEstateUnitComponent,
    UpdateEstateUnitsComponent,
    ConsultEstateUnitComponent
  ],
  imports: [
    CommonModule,
    EstateUnitRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    SharedsModule

  ],
  providers: [
    ApiService, PhoneNumberSuffix, PhoneNumberPreffix
  ]
})
export class EstateUnitModule { }
