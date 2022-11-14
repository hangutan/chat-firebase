import produce from "immer";
import { SET_LOADING, UPDATE_INIT_DATA } from "./actionTypes";

export interface InitReducer {
  loading: boolean;
  init_data: InitDataReducer;
}

export interface InitDataReducer {
  customerId: string;
  loanId: number;
}

const initial = {
  loading: false,
  init_data: {},
} as InitReducer;

export const initReducer = (state = initial, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOADING:
        draft.loading = action.loading;
        break;
      case UPDATE_INIT_DATA:
        draft.init_data = action.init_data;
        break;
      default:
        return draft;
    }
  });

export default {
  initReducer,
};
