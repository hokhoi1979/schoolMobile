import { call, put, select, takeLatest } from "redux-saga/effects";

import axios from "axios";
import {
  FETCH__VACCINE__STUDENT,
  fetchVaccineStudentFail,
  fetchVaccineStudentSucess,
} from "./fetchVaccineDetailSLice";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* vaccineStudentSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const id = action.payload;
    const response = yield call(
      axios.get,
      `${API_URL}/nurse/v1/vaccinationEvent/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchVaccineStudentSucess(response.data));
      console.log("BYID", response.data);
    } else {
      yield put(fetchVaccineStudentFail(response.status));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    yield put(fetchVaccineStudentFail(errorMessage));
  }
}

function* watchFetchVaccineStudent() {
  yield takeLatest(FETCH__VACCINE__STUDENT, vaccineStudentSaga);
}

export default watchFetchVaccineStudent;
