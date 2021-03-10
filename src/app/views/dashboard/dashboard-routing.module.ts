import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalLayoutComponent } from 'src/app/layouts/principal-layout/principal-layout/principal-layout.component';
import { AuthGuard } from 'src/app/core/guards/auth-guard/auth.guard';
import { RoutingPath } from 'src/environments/routing-path';

const routes: Routes = [
  {
    path: '',
    component: PrincipalLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(mod => mod.HomeModule),
        data: {
          breadcrumb: '',
        }
      },
      {
        path: RoutingPath.appRouting.components.dashboard.pages.administrator_user.path,
        loadChildren: () => import('./pages/manage-users/manage-users.module').then(mod => mod.ManageUsersModule),
        data: {
          breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_user.breadcrumb,
          permits: RoutingPath.appRouting.components.dashboard.pages.administrator_user.permits,
        },
        canActivate: [AuthGuard],
      },
      {
        path: RoutingPath.appRouting.components.dashboard.pages.administrator_rol.path,
        loadChildren: () => import('./pages/rol/rol.module').then(mod => mod.RolModule),
        data: {
          breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_rol.breadcrumb,
          permits: RoutingPath.appRouting.components.dashboard.pages.administrator_rol.permits
        },
        canActivate: [AuthGuard],
      },
      {
        path: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.path,
        loadChildren: () => import('./pages/estate-unit/estate-unit.module').then(mod => mod.EstateUnitModule),
        data: {
          breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.breadcrumb,
          permits: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.permits
        },
        canActivate: [AuthGuard],
      },
      { path: '**', redirectTo: '/dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
