import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard/auth.guard';
import { CanDeactivateGuard } from 'src/app/shareds/form-validate/can-deactivate.guard';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./views/account/account.module').then(mod => mod.AccountModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./views/errors/errors.module').then(mod => mod.ErrorsModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./views/dashboard/dashboard.module').then(mod => mod.DashboardModule),
    canDeactivate:[CanDeactivateGuard],
    data: {
      breadcrumb : 'INICIO'
    }
  },
  { path: '**', redirectTo: '/account/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
