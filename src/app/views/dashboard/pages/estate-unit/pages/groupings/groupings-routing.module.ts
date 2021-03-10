import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutingPath } from 'src/environments/routing-path';
import { ManagerGroupingsComponent } from './pages/manager-groupings/manager-groupings.component';
import { ManagerGroupingsModifyComponent } from './pages/manager-groupings-modify/manager-groupings-modify.component';
import { ManagerGroupingsCreateComponent } from './pages/manager-groupings-create/manager-groupings-create.component';
import { CanDeactivateGuard } from 'src/app/shareds/form-validate/can-deactivate.guard';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ManagerGroupingsComponent,
        data: {
        }
      },
      {
        path: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.create.path,
        component: ManagerGroupingsCreateComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.create.breadcrumb,
          permits: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.create.permits
        }
      },
      {
        path: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.modify.path,
        component: ManagerGroupingsModifyComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.modify.breadcrumb,
          permits: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.modify.permits
        }
      },
      {
        path: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent.path,
        loadChildren: () => import('./pages/group-independent-units/group-independent-units.module').then(mod => mod.GroupIndependentUnitsModule),
        data: {
          breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent.breadcrumb,
          permits: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent.permits
        }
      },
      { path: '**', redirectTo: '/dashboard/' + RoutingPath.appRouting.components.dashboard.pages.administrator_rol.path } // TODO: Modificar
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupingsRoutingModule { }
