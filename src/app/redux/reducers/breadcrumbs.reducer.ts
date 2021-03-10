import * as breadcrumbs from './../actions/breadcrumbs.actions';

const addItem = '';
const deleteItem = '';
const items: Array<string> = Array<string>();
const initialState: any = {
    addItem,
    deleteItem,
    items
};

export function breadcrumbsReducer(state= initialState, action: breadcrumbs.Actions): any {
    switch (action.type) {
        case breadcrumbs.ADD_ITEMS_ROUTES_REDUCER:
            return {
                ...state,
                addItem: action.addItem
            };
        case breadcrumbs.DELETE_ITEMS_ROUTES_REDUCER:
            return {
                ...state,
                deleteItem: action.deleteItem
            };
        case breadcrumbs.VIEW_ITEMS_ROUTES_REDUCER:
            return {
                ...state,
                items: action.items
            };
        default:
            return state;
    }
}
