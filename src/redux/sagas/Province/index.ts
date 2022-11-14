import { all } from "redux-saga/effects";
import getProvince from './get';

export const provinceSaga = function* root() {
  yield all([getProvince()]);
};
  