import axios from "axios";

import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  CHECKUP__DETAIL__RESULT,
  fetchCheckupDetailResultFail,
  fetchCheckupDetailResultSuccess,
} from "./checkupDetailResultSlice";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* checkupDetailResultSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const id = action.payload;
    const response = yield call(
      axios.get,
      `${API_URL}/nurse/v1/check-up/${id}/contents`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchCheckupDetailResultSuccess(response.data));
    } else {
      yield put(fetchCheckupDetailResultFail(response.status));
    }
  } catch (error) {
    yield put(fetchCheckupDetailResultFail(error));
  }
}

function* watchCheckupDetailResult() {
  yield takeLatest(CHECKUP__DETAIL__RESULT, checkupDetailResultSaga);
}

export default watchCheckupDetailResult;
