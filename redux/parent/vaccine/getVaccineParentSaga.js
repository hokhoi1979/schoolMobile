import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_VACCINE_PARENT,
  fetchVaccineParentSuccess,
  fetchVaccineParentFail,
} from "./getVaccineParentSlice";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* vaccineParentSaga() {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const response = yield call(
      axios.get,
      `${API_URL}/parent/v1/vaccinationEvent`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("KHANH", response.data);
      yield put(fetchVaccineParentSuccess(response.data));
    } else {
      yield put(fetchVaccineParentFail(`API Error: ${response.data}`));
    }
  } catch (error) {
    yield put(fetchVaccineParentFail(`API Error: ${error}`));
  }
}

function* watchFetchVaccineParent() {
  yield takeLatest(FETCH_VACCINE_PARENT, vaccineParentSaga);
}
export default watchFetchVaccineParent;
