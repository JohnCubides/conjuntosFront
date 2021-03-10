import { Injector } from '@angular/core';
import { AbstractBasic } from '../abstract-basic/abstract-basic';

export abstract class AbstractLogin extends AbstractBasic {
    constructor(injector: Injector) {
        super(injector);
    }

    public acceptLogin(token: any, refreshToken: any) {
        this.localStorage.setItem('token', token);
        this.localStorage.setItem('refreshToken', refreshToken);
        this.router.navigate(['dashboard/']);
    }
    public logoutLogin() {
        this.localStorage.removeItem('token');
        this.localStorage.removeItem('refreshToken');
        this.router.navigate(['/account/login']);
    }
}
