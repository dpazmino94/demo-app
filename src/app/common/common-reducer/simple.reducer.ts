import { Action } from '@ngrx/store'

export function simpleReducer(state: boolean = false, action: Action) {
	console.log(action.type, state);
	switch (action.type) {
		case 'ADMIN':
			return state = true;

		default:
			return state = false;
	}
}