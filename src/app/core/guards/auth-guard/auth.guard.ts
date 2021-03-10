import { Injectable, Injector } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AbstractLogin } from '../../models/abstracts/abstract-login/abstract-login';
import { JwtService } from '../../services/jwt-service/jwt.service';
import { RoutingPath } from '../../../../environments/routing-path';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends AbstractLogin implements CanActivate {
  private permits: any[] = [];

  constructor(injector: Injector, private readonly jwt: JwtService) {
    super(injector);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let result = false;
      const token = this.localStorage.getItemString('token');
      if (this.permits.length === 0) {
        this.jwt.setPermits(token);
      }
      this.store.select('permits').subscribe( (permits: any) => {
        this.permits = permits.items;
      });
      if (this.permits.length > 0) {
        this.permits.forEach(p => {
          if (p.toUpperCase() === next.data.permits.toUpperCase()) {
            result = true;
          }
        });
      }

      const tokenValid = this.logout(token);

      if (result && tokenValid) {
        return true;
      } else {
        if (!tokenValid) {
          this.router.navigate(['/' + RoutingPath.appRouting.components.account.path + '/' + RoutingPath.appRouting.components.account.pages.login.path]);
        } else if (!result) {
          this.router.navigate(['/' + RoutingPath.appRouting.components.errors.path + '/' + RoutingPath.appRouting.components.errors.pages.unauthorized.path]);
        }
        return false;
      }
  }

  private logout(token: string): boolean {
    let result = true;
    if (this.jwt.getTokenExpired(token)) {
      result = false;
      this.logoutLogin();
    }
    return result;
  }
}
