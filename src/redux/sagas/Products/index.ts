import { all } from "redux-saga/effects";
import getInformation from './get';

export const productsSaga = function* root() {
  yield all([getInformation()]);
};
  