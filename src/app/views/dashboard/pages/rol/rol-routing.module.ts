import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './pages/create/create.component';
import { ModifyComponent } from './pages/modify/modify.component';
import { ConsultComponent } from './pages/consult/consult.component';
import { RoutingPath } from 'src/environments/routing-path';
import { AdminRolComponent } from './pages/admin-rol/admin-rol.component';
import { AuthGuard } from 'src/app/core/guards/auth-guard/auth.guard';
import { CanDeactivateGuard } from 'src/app/shareds/form-validate/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AdminRolComponent
      },
      {
        path: RoutingPath.appRouting.components.dashboard.pages.administrator_rol.pages.create.path,
        component: CreateComponent,
        data: {
          breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_rol.pages.create.breadcrumb,
          permits: RoutingPath.appRouting.components.dashboard.pages.administrator_rol.pages.create.permits
        },
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: RoutingPath.appRouting.components.dashboard.pages.administrator_rol.pages.modify.path,
        component: ModifyComponent,
        data: {
          breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_rol.pages.modify.breadcrumb,
          permits: RoutingPath.appRouting.components.dashboard.pages.administrator_rol.pages.modify.permits
        },
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: RoutingPath.appRouting.components.dashboard.pages.administrator_rol.pages.consult.path,
        component: ConsultComponent,
        data: {
          breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_rol.pages.consult.breadcrumb,
          permits: RoutingPath.appRouting.components.dashboard.pages.administrator_rol.pages.consult.permits
        },
        canActivate: [AuthGuard]
      },
      { path: '**', redirectTo: '/dashboard/' + RoutingPath.appRouting.components.dashboard.pages.administrator_rol.path }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolRoutingModule { }
