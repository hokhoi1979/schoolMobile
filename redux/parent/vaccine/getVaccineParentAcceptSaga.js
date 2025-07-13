import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_ACCEPT_VACCINE,
  fetchAcceptVaccineSuccess,
  fetchAcceptVaccineFail,
} from "./getVaccineParentAcceptSlice";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* getVaccineParentAcceptSaga(action) {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const { studentID, vaccinationEventID } = action.payload; // Sửa tại đây
    const response = yield call(
      axios.put,
      `${API_URL}/parent/v1/${vaccinationEventID}/${studentID}/accepted`, // Sửa tại đây
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchAcceptVaccineSuccess(response.data));
    } else {
      yield put(fetchAcceptVaccineFail(response.status));
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put(
      fetchAcceptVaccineFail({
        message: error.message,
        code: error.code,
        status: error.response?.status,
      })
    );
  }
}

function* watchFetchAcceptVaccine() {
  yield takeLatest(FETCH_ACCEPT_VACCINE, getVaccineParentAcceptSaga);
}
export default watchFetchAcceptVaccine;
