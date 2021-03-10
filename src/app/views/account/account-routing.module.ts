import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutingPath } from '../../../environments/routing-path';
import { LoginComponent } from './pages/login/login.component';
import { RestorePasswordComponent } from './pages/restore-password/restore-password.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          breadcrumb: RoutingPath.appRouting.components.account.pages.login.breadcrumb,
        }
      },
      {
        path: 'restore-password/:token',
        component: RestorePasswordComponent,
        data: {
          breadcrumb: RoutingPath.appRouting.components.account.pages.restorePassword.breadcrumb,
        }
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
