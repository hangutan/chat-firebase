import { all } from "redux-saga/effects";
import ocaInformation from "./ocr";
import checkCustomer from "./check";

export const customerSaga = function* root() {
  yield all([ocaInformation(), checkCustomer()]);
};
