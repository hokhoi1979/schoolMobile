import { call, put, select, takeLatest } from "redux-saga/effects";

import axios from "axios";
import {
  FETCH__VACCINE__RESULT,
  fetchVaccineResultFail,
  fetchVaccineResultSuccess,
} from "./vaccineResultSlice";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
function* vaccineResultSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const id = action.payload;
    const response = yield call(axios.get, `${API_URL}/nurse/v1/${id}/result`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      yield put(fetchVaccineResultSuccess(response.data));
      console.log("KHOI", response.data);
    } else {
      yield put(fetchVaccineResultFail(error));
    }
  } catch (error) {
    yield put(fetchVaccineResultFail(error));
  }
}

function* watchFetchVaccineResult() {
  yield takeLatest(FETCH__VACCINE__RESULT, vaccineResultSaga);
}

export default watchFetchVaccineResult;
