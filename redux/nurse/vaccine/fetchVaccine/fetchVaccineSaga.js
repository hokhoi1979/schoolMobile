import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH__VACCINE,
  fetchVaccineFail,
  fetchVaccineSuccess,
} from "./fetchVaccineSlice";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* vaccineSaga() {
  try {
    const token = yield select((state) => state.account.token);

    const response = yield call(
      axios.get,
      `${API_URL}/nurse/v1/vaccinationEvent`,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchVaccineSuccess(response.data));
      // console.log("RESPONSE", response.data);
    } else {
      yield put(fetchVaccineFail(`API Error: ${response.status}`));
    }
  } catch (error) {
    yield put(fetchVaccineFail(`API Error: ${error}`));
  }
}

function* watchFetchVaccine() {
  yield takeLatest(FETCH__VACCINE, vaccineSaga);
}

export default watchFetchVaccine;
