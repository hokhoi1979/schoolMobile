import axios from "axios";

import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH__STUDENT__CHECKUP,
  fetchStudentCheckupFail,
  fetchStudentCheckupSuccess,
} from "./checkupDetailSlice";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* listStudentCheckupSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const id = action.payload;
    const response = yield call(
      axios.get,
      `${API_URL}/nurse/v1/check-up/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchStudentCheckupSuccess(response.data));
    } else {
      yield put(fetchStudentCheckupFail(response.status));
    }
  } catch (error) {
    yield put(fetchStudentCheckupFail(error));
  }
}

function* watchFetchStudentCheckup() {
  yield takeLatest(FETCH__STUDENT__CHECKUP, listStudentCheckupSaga);
}

export default watchFetchStudentCheckup;
