import axios from "axios";

import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH__CHECKUP__RESULT,
  fetchCheckupResultFail,
  fetchCheckupResultSuccess,
} from "./resultCheckupSlice";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
function* checkupResultSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const id = action.payload;
    const response = yield call(
      axios.get,
      `${API_URL}/nurse/v1/check-up/${id}/result`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchCheckupResultSuccess(response.data));
      console.log("RESULT", response.data);
    } else {
      yield put(fetchCheckupResultFail(response.status));
    }
  } catch (error) {
    yield put(fetchCheckupResultFail(error));
  }
}

function* watchFetchCheckupResult() {
  yield takeLatest(FETCH__CHECKUP__RESULT, checkupResultSaga);
}

export default watchFetchCheckupResult;
