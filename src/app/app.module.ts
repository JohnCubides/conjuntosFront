import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrincipalLayoutComponent } from './layouts/principal-layout/principal-layout/principal-layout.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import { InterceptorsService } from './core/interceptors/interceptors.service';
import { SharedsModule } from './shareds/shareds.module';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthGuard } from './core/guards/auth-guard/auth.guard';
import { ApiService } from './core/https/http.service';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

export function tokenGetter2() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    PrincipalLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    SharedsModule,
    StoreModule.forRoot(appReducers, { metaReducers: [] }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter2,
        whitelistedDomains: [environment.endpointv1],
        blacklistedRoutes: [environment.endpointv1 + '/account/login']
      }
    })
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorsService,
      multi: true
    }
  ],
})
export class AppModule { }
