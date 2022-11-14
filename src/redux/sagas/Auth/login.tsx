import { takeLatest, put, call } from "redux-saga/effects";
import { LOGIN, LOGOUT, CLEAR_AUTH } from "redux/reducers/auth/actionTypes";
import { SET_MESSAGES_REDUCER } from "redux/reducers/messages/actionTypes";
import { SET_CURRENT_USER } from "redux/reducers/auth/actionTypes";
import { CLEAR_CUSTOMER } from "redux/reducers/customer/actionTypes";
// import { UPDATE_POS_LIST } from "redux/reducers/products/actionTypes";
// import { setToken } from "api/configApi";
import { login } from "api/auth/login";
// import Cookie from 'js-cookie';
import i18n from "i18n";

function* loginFunction({ current_user }) {
  try {
    const data = yield call(login, current_user);
    if (data && data.result) {
      const currentUser = data.result;
      const posList = data.posList;
      yield put({ type: SET_CURRENT_USER, currentUser });
    }
    // yield put({ type: UPDATE_POS_LIST, posList });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* logoutFunction(action) {
  try {
    // setToken("");
    yield put({
      type: CLEAR_AUTH
    });
    yield put({
      type: CLEAR_CUSTOMER
    });
    // yield put({
    //   type: SET_MESSAGES_REDUCER,
    //   message: {
    //     type: "success",
    //     key: "SIGNED_OUT_SUCCESSFULLY",
    //     message: i18n.t("SIGNED_OUT_SUCCESSFULLY"),
    //   },
    // });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* Login() {
  yield takeLatest(LOGIN, loginFunction);
  yield takeLatest(LOGOUT, logoutFunction);
}

export default Login;
