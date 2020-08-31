import { AUTH_SUCCESS, AUTH_ERROR } from "./ConstantActionTypes";

// Signing up with Firebase
export const signup = (email, password) => async dispatch => {
  try {
    
  } catch (err) {
    
  }
};

export const signInSuccess = () => {
  return {
    type : AUTH_SUCCESS
  }
}

export const signInFailed = () => {
  return {
    type : AUTH_ERROR
  }
}