import { call, put, takeLatest, select } from "redux-saga/effects";
import * as types from "redux/reducers/customer/actionTypes";

import { checkCustomer } from "api/customer";

function* checkCustomerSaga(action) {
  try {
    const data = {};
    console.log("chạy vào check customer :", action);
    // const res = yield call(checkCustomer, data);
    console.log("data check customer");
  } catch (error) {
    return Promise.reject(error);
  }
}

function* listRegions() {
  yield takeLatest(types.CHECK_CUSTOMER, checkCustomerSaga);
}

export default listRegions;
