import { ActionTypes } from "../constants/action-types";

const initialState = [];

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USERS:
      return { ...state, user: action.payload };
    case ActionTypes.REMOVE_SELECTED_USERS:
      return { ...initialState };
    default:
      return state;
  }
};
