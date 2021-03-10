import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RoutingPath } from 'src/environments/routing-path';
import { BadRequestComponent } from './pages/bad-request/bad-request.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent,
        data: {
          breadcrumb: RoutingPath.appRouting.components.errors.pages.notFound.breadcrumb
        }
      },
      {
        path: 'bad-request',
        component: BadRequestComponent,
        data: {
          breadcrumb: RoutingPath.appRouting.components.errors.pages.badRequest.path
        }
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent,
        data: {
          breadcrumb: RoutingPath.appRouting.components.errors.pages.unauthorized.path
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class ErrorsRoutingModule { }
