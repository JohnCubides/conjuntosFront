import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/https/http.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Injector } from '@angular/core';

export abstract class AbstractBasic {
    protected localStorage: LocalStorageService;
    protected router: Router;
    protected api: ApiService;
    protected store: Store<AppState>;

    constructor(injector: Injector) {
        this.localStorage = injector.get(LocalStorageService);
        this.router = injector.get(Router);
        this.api = injector.get(ApiService);
        this.store = injector.get(Store);
    }
}
