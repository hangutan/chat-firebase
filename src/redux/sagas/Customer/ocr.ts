import { call, put, takeLatest, select } from "redux-saga/effects";
import * as types from "redux/reducers/customer/actionTypes";

function* getInformationSaga(action) {
  try {
    console.log("test nhan ");
  } catch (error) {
    return Promise.reject(error);
  }
}


function* listRegions() {
  yield takeLatest(types.GET_INFORMATION, getInformationSaga);
}

export default listRegions;