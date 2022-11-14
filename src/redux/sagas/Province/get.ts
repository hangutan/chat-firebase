import { call, put, takeLatest, select } from "redux-saga/effects";
import { getProvince, getDistrict, getWard } from "api/province";
import * as types from "redux/reducers/province/actionTypes";

function* getProvinceSaga(action) {
  try {
    const data = yield call(getProvince);
    yield put({ type: types.UPDATE_PROVINCE, listProvince: data });
  } catch (error) {
    yield put({ type: types.UPDATE_PROVINCE, listProvince: [] });
    return Promise.reject(error);
  }
}

function* getDistrictSaga(action) {
  try {
    const { params } = action;
    const code = params.codeProvince;
    if (code) {
      const data = yield call(getDistrict, code);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

function* getWardSaga(action) {
  try {
    const { params } = action;
    const code = params.codeDistrict;
    const data = yield call(getWard, code);
  } catch (error) {
    return Promise.reject(error);
  }
}

function* listRegions() {
  yield takeLatest(types.GET_PROVINCE, getProvinceSaga);
  yield takeLatest(types.GET_DISTRICT, getDistrictSaga);
  yield takeLatest(types.GET_WARD, getWardSaga);
}

export default listRegions;