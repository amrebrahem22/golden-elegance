import { updatedState } from "../utils";
import * as ActionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  loading: false,
  error: null,
};

const stateAuthStart = (state = initialState, action) => {
  return updatedState(state, { loading: true, error: null });
};

const stateAuthSuccess = (state = initialState, action) => {
  return updatedState(state, {
    token: action.token,
    loading: false,
    error: null,
  });
};

const stateAuthFail = (state = initialState, action) => {
  return updatedState(state, {
    token: null,
    loading: false,
    error: action.error,
  });
};

const stateAuthLogout = (state = initialState, action) => {
  return updatedState(state, { token: null, loading: false, error: null });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_START:
      return stateAuthStart(state, action);
    case ActionTypes.AUTH_SUCCESS:
      return stateAuthSuccess(state, action);
    case ActionTypes.AUTH_FAIL:
      return stateAuthFail(state, action);
    case ActionTypes.AUTH_LOGOUT:
      return stateAuthLogout(state, action);
    default:
      return state;
  }
};

export default authReducer;
