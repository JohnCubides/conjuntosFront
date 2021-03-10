import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ErrorsRoutingModule } from './errors-routing.module';
import { BadRequestComponent } from './pages/bad-request/bad-request.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    BadRequestComponent,
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    ErrorsRoutingModule
  ]
})
export class ErrorsModule { }
