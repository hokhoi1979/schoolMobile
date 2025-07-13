import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_ACCEPT_CHECK_UP,
  fetchAcceptCheckUpSuccess,
  fetchAcceptCheckUpFail,
} from "./getCheckUpParentAcceptSlice";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* getCheckUpParentAcceptSaga(action) {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const { studentID, healthCheckUpID } = action.payload;
    const response = yield call(
      axios.put,
      `${API_URL}/parent/v1/check-up/${healthCheckUpID}/${studentID}/accepted`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchAcceptCheckUpSuccess(response.data));
    } else {
      yield put(fetchAcceptCheckUpFail(response.status));
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put(
      fetchAcceptCheckUpFail({
        message: errorMessage,
        code: error.code,
        status: error.response?.status,
      })
    );
  }
}

function* watchFetchAcceptCheckUp() {
  yield takeLatest(FETCH_ACCEPT_CHECK_UP, getCheckUpParentAcceptSaga);
}
export default watchFetchAcceptCheckUp;
