import { ADD_ERROR, REMOVE_ERROR } from "../actionTypes";

export function addError(error) {
	console.log(error)
	return {
		type: ADD_ERROR,
		error,
	};
}

export function removeError(error) {
	return {
		type: REMOVE_ERROR,
	};
}
