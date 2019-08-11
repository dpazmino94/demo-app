import { Action } from '@ngrx/store'

/**
 * 	This function verify the admin password and if it is correct enables the Admin Mode
 *
 * @export
 * @param {boolean} [state=false]
 * @param {Action} action
 * @returns
 */
export function simpleReducer(state: boolean = false, action: Action) {
	switch (action.type) {
		case 'admin123':
			return state = true;

		default:
			return state = false;
	}
}