import produce from "immer";
import * as types from "./actionTypes";

export interface ProductsReducer {
  rateInformation: RateInformationReducer;
}

export interface RateInformationReducer {
  dp_ID: number;
  dp_IS_ACTIVE: number;
  dp_MASTER_SCHEME_ID: number;
  dp_MAX_DOWN_PAYMENT: number;
  dp_MIN_DOWN_PAYMENT: number;
  ex_MASTER_SCHEME_ID: number;
  ex_SHOULD_USE_INSURANCE: number;
  scheme_ID: number;
  scheme_MASTER_SCHEME_GROUP_ID: number;
  scheme_MAX_LOAN_AMOUNT: number;
  scheme_MAX_RATE: number;
  scheme_MAX_TENURE: number;
  scheme_MIN_LOAN_AMOUNT: number;
  scheme_MIN_RATE: number;
  scheme_MIN_TENURE: number;
  scheme_NAME: string;
  scheme_STATUS: string;
  [key: string]: any;
}

const initial = {
  rateInformation: {}
} as ProductsReducer;

export const productsReducer = (state = initial, action: any) =>
  produce(state, draft => {
    switch (action.type) {
      case types.UPDATE_RATE_INFORMATION:
        draft.rateInformation = action.rateInformation;
        break;
      case types.CLEAR_PRODUCT:
        draft.rateInformation = initial.rateInformation;
      default:
        return draft;
    }
    return draft;
  });
