import { all } from "redux-saga/effects";
import { authSaga } from "./Auth";
import { provinceSaga } from "./Province";
import { customerSaga } from "./Customer";
import { productsSaga } from "./Products";

// Register all your watchers
export const rootSaga = function* root() {
  yield all([authSaga(), provinceSaga(), customerSaga(), productsSaga()]);
};
