import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  FETCH_DECLINE_CHECK_UP,
  fetchDeclineCheckUpSuccess,
  fetchDeclineCheckUpFail,
} from "./getCheckUpParentDeclineSlice";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* getCheckUpParentDeclineSaga(action) {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const { healthCheckUpID, studentID, note } = action.payload;

    const response = yield call(
      axios.put,
      `${URL_API}/parent/v1/check-up/${healthCheckUpID}/${studentID}/declined`,
      { note: note },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchDeclineCheckUpSuccess(response.data));
    } else {
      yield put(fetchDeclineCheckUpFail(response.status));
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    console.error("Decline Saga - Full Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    yield put(
      fetchDeclineCheckUpFail({
        message: error.message,
        code: error.code,
        status: error.response?.status,
      })
    );
  }
}

function* watchFetchDeclineCheckUp() {
  yield takeLatest(FETCH_DECLINE_CHECK_UP, getCheckUpParentDeclineSaga);
}
export default watchFetchDeclineCheckUp;
