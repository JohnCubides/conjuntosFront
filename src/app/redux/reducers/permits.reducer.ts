import * as permits from '../actions/permits.actions';

const items: Array<string> = Array<string>();
const initialState: any = {
    items
};

export function permitsReducer(state= initialState, action: permits.Actions): any {
    switch (action.type) {
        case permits.VIEW_PERMITS_ROUTES_REDUCER:
            return {
                ...state,
                items: action.items
            };
        default:
            return state;
    }
}
