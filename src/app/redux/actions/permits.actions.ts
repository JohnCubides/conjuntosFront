import { Action } from '@ngrx/store';

export const VIEW_PERMITS_ROUTES_REDUCER = '[PERMITS] Agrega datos para los permits';

export class ViewPermitsReducerAction implements Action {
    readonly type = VIEW_PERMITS_ROUTES_REDUCER;
    constructor(public items: Array<string>) { }
}
export type Actions = ViewPermitsReducerAction;
