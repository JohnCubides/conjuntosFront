import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from 'src/app/core/https/http.service';
import { RestorePasswordComponent } from './pages/restore-password/restore-password.component';
import { SharedsModule } from 'src/app/shareds/shareds.module';

@NgModule({
  declarations: [
    LoginComponent,
    RestorePasswordComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    SharedsModule
  ],
  providers: [
    ApiService
  ]
})
export class AccountModule { }
