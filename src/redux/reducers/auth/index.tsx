import produce from "immer";
import * as types from "./actionTypes";
import { UserRole } from "common/";

export interface AuthReducer {
  current_user: UserReducer;
  idToken: string;
}
export interface UserReducer {
  id: string;
  userId: string;
  salesCode: string;
  status: number;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  email: string;
}

const initialUser = {
  id: "",
  userId: "",
  salesCode: "",
  status: 1,
  firstName: "",
  lastName: "",
  fullName: "",
  phone: "",
  email: ""
} as UserReducer;

const initial = {
  current_user: initialUser,
  idToken: ""
} as AuthReducer;

export const authReducer = (state = initial, action: any) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_CURRENT_USER:
        draft.current_user = action.currentUser;
        // draft.idToken = action.current_user.token;
        break;
      case types.UPDATE_CURRENT_USER:
        draft.current_user.phone = action.current_user.phone;
        break;
      case types.CLEAR_AUTH:
        draft.current_user = initialUser;
        // draft.idToken = "";
        break;
      default:
        return draft;
    }
    return draft;
  });

// const checkIsAdminOrNot = (userInfo) => {
//   if (userInfo.roles && userInfo.roles.includes(UserRole.Administrator)) {
//     return {
//       ...userInfo,
//       isAdmin: true,
//     };
//   }
//   return userInfo;
// };
