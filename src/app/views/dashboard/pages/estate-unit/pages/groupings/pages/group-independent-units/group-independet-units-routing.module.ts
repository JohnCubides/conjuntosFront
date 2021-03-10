import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutingPath } from 'src/environments/routing-path';
import { AdminIndependentUnitsComponent } from './pages/admin-independent-units/admin-independent-units.component';
import { CreateComponent } from './pages/create/create.component';
import { ModifyComponent } from './pages/modify/modify.component';
import { CanDeactivateGuard } from 'src/app/shareds/form-validate/can-deactivate.guard';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AdminIndependentUnitsComponent,
        data: {
        }
      },
      {
        path: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent.pages.create.path,
        component: CreateComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent.pages.create.breadcrumb,
          permits: RoutingPath.appRouting.components.dashboard.pages.administrator_user.pages.create.permits
        }
      },
      {
        path: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent.pages.modify.path,
        component: ModifyComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent.pages.modify.breadcrumb,
          permits: RoutingPath.appRouting.components.dashboard.pages.administrator_user.pages.modify.permits
        }
      },
      {
        path: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent.pages.admin_independet_user_units.path,
        loadChildren: () => import('./pages/admin-independent-users-units/admin-independent-user-units.module').then(mod => mod.AdminIndependentUserUnitsModule),
        data: {
          // tslint:disable-next-line: max-line-length
          breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent.pages.admin_independet_user_units.breadcrumb,
          // tslint:disable-next-line: max-line-length
          permits: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent.pages.admin_independet_user_units.permits
        }
      },
      { path: '**', redirectTo: '/dashboard/' + RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent } // TODO: Modificar
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupIndepedenetUnitsRoutingModule { }
