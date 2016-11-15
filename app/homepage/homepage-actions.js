import axios from "axios";
import { fromJS } from "immutable";

export const FETCH_USER = "FETCH_USER";
export const ACTION_RESPONSE = "ACTION_RESPONSE";


export const fetchUser = (user) => ({
  type: FETCH_USER,
  user
});

export const actionStatus = (response) => ({
  type: ACTION_RESPONSE,
  response
})

export const registerUser = (details) => async dispatch => {
  try {
    const response = await axios.post(`/api/register`, details);
    dispatch(actionStatus(response.data));
  } catch (error) {
    dispatch(actionStatus(error.response.data));
  }
};

export const loginUser = (details) => async dispatch => {
  try {
    const response = await axios.post(`/api/login`, details);
    if(response.status === 201 || response.status === 204) {
	    window.location = `${window.location.protocol}//${window.location.host}`;
    }
  } catch (error) {
    dispatch(actionStatus(error.response.data));
    console.log(error.response.data, "error logging in");
  }
};

export const fetchUserApi = () => async dispatch => {
  try {
    if (typeof window === "undefined") {
      return;
    }
    const response = await axios.get(`/api/user`);
    dispatch(fetchUser(fromJS(response.data)));
  } catch (error) {
    console.trace(error);
  }
};


// export const createLocks = (place_id)
