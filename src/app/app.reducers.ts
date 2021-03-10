
import { ActionReducerMap } from '@ngrx/store';

// Modelos

// Modelos

// Reducers
import * as breadcrumbsReducer from './redux/reducers/breadcrumbs.reducer';
import * as permitsReducer from './redux/reducers/permits.reducer';
import { ViewPermitsReducerAction } from './redux/actions/permits.actions';


export  interface AppState {
    breadcrumbs: any;
    permits: ViewPermitsReducerAction;
}

export const appReducers: ActionReducerMap<AppState> = {
    breadcrumbs: breadcrumbsReducer.breadcrumbsReducer,
    permits: permitsReducer.permitsReducer
};
