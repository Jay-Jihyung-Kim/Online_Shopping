import { ActionTypes } from "../constants/action-types";

const initialState = {
  user: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USERS:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
