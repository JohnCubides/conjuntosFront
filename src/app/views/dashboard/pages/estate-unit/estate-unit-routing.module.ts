import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEstateUnitComponent } from './pages/create-estate-unit/create-estate-unit.component';
import { ManagerEstateUnitsComponent } from './pages/manager-estate-units/manager-estate-units.component';
import { RoutingPath } from 'src/environments/routing-path';
import { ConsultEstateUnitComponent } from './pages/consult-estate-unit/consult-estate-unit.component';
import { UpdateEstateUnitsComponent } from './pages/update-estate-units/update-estate-units.component';
import { CanDeactivateGuard } from 'src/app/shareds/form-validate/can-deactivate.guard';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ManagerEstateUnitsComponent,
        data: {
          // breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.breadcrumb,
        }
      },
      {
        path: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.create.path,
        component: CreateEstateUnitComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.create.breadcrumb,
          permits: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.create.permits
        }
      },
      {
        path: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.modify.path,
        component: UpdateEstateUnitsComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.modify.breadcrumb,
          permits: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.modify.permits
        }
      },
      {
        path: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.consult.path,
        component: ConsultEstateUnitComponent,
        data: {
          breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.consult.breadcrumb,
          permits: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.consult.permits
        }
      },
      {
        path: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.path,
        loadChildren: () => import('./pages/groupings/groupings.module').then(mod => mod.GroupingsModule),
        data: {
          breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.breadcrumb,
          permits: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.permits
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstateUnitRoutingModule { }
