import { Map } from "immutable";
import { set } from "../../util/functional-immutable";
import {
  FETCH_USER,
  ACTION_RESPONSE
} from "./homepage-actions";


const initialState  = new Map();

const HomepageReducer = (state = initialState, action) => {
	switch(action.type) {
		case FETCH_USER:
			return set("user", action.user, state);
		case ACTION_RESPONSE:
			return set("response", action.response, state);
		default:
			return state;
	}
}


export default HomepageReducer;
