import produce from "immer";
import * as types from "./actionTypes";

export interface ProvinceReducer {
  listProvince: any[];
  listDistrict: any[];
  listWard: any[];
}

const initial = {
  listProvince: [],
  listDistrict: [],
  listWard: [],
} as ProvinceReducer;

export const provinceReducer = (state = initial, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.UPDATE_PROVINCE:
        draft.listProvince = action.listProvince;
        break;
      case types.UPDATE_DISTRICT:
        draft.listDistrict = action;
        break;
      case types.UPDATE_WARD:
        draft.listWard = action;
        break;
      default:
        return draft;
    }
    return draft;
  });
