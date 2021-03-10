import { Injectable, Injector } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as fromPermitsActions from './../../../redux/actions/permits.actions';
import { AbstractBasic } from '../../models/abstracts/abstract-basic/abstract-basic';

@Injectable({
  providedIn: 'root'
})
export class JwtService extends AbstractBasic {

  constructor(injector: Injector, private jwtHelper: JwtHelperService) {
    super(injector);
  }

  public getTokenPayload(token: string) {
      return this.jwtHelper.decodeToken(token);
  }
  public getTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  public getTokenExpirationDate(token: string) {
    return this.jwtHelper.getTokenExpirationDate(token);
  }

  public setPermits(token: string) {
      const permits = this.getTokenPayload(token) !== null ? this.getTokenPayload(token).permit : '';
      const action = new fromPermitsActions.ViewPermitsReducerAction(permits);
      this.store.dispatch(action);
  }
}
