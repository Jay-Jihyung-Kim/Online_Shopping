import { ActionTypes } from "../constants/action-types";

export const setUser = (user) => {
  return {
    type: ActionTypes.SET_USERS,
    payload: user,
  };
};

export const setCart = (cart) => {
  return {
    type: ActionTypes.SET_CARTS,
    payload: cart,
  };
};
