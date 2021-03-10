import { Action } from '@ngrx/store';

export const ADD_ITEMS_ROUTES_REDUCER = '[BREADCRUMBS] Agrega item para el breadcrumbs';
export const DELETE_ITEMS_ROUTES_REDUCER = '[BREADCRUMBS] Elimina item para el breadcrumbs';
export const VIEW_ITEMS_ROUTES_REDUCER = '[BREADCRUMBS] Muestra todos los items para el breadcrumbs';

export class AddItemReducerAction implements Action {
    readonly type = ADD_ITEMS_ROUTES_REDUCER;
    constructor(public addItem: string) { }
}
export class DeleteItemReducerAction implements Action {
    readonly type = DELETE_ITEMS_ROUTES_REDUCER;
    constructor(public deleteItem: string) { }
}

export class ViewItemsReducerAction implements Action {
    readonly type = VIEW_ITEMS_ROUTES_REDUCER;
    constructor(public items: Array<string>) { }
}
export type Actions = AddItemReducerAction | DeleteItemReducerAction | ViewItemsReducerAction;
