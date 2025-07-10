import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_CHECK_UP_PARENT,
  fetchCheckUpParentSuccess,
  fetchCheckUpParentFail,
} from "./getCheckUpParentSlice";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* checkupParentSaga() {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const response = yield call(axios.get, `${API_URL}/parent/v1/check-up`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 201) {
      yield put(fetchCheckUpParentSuccess(response.data));
    } else {
      yield put(fetchCheckUpParentFail(`API Error: ${response.data}`));
    }
  } catch (error) {
    yield put(fetchCheckUpParentFail(`API Error: ${error}`));
  }
}

function* watchFetchCheckUpParent() {
  yield takeLatest(FETCH_CHECK_UP_PARENT, checkupParentSaga);
}
export default watchFetchCheckUpParent;
