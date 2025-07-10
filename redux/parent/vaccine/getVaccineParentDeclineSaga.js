import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_DECLINE_VACCINE,
  fetchDeclineVaccineSuccess,
  fetchDeclineVaccineFail,
} from "./getVaccineParentDeclineSlice";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* getVaccineParentDeclineSaga(action) {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const { vaccinationEventID, studentID, note } = action.payload;

    const response = yield call(
      axios.put,
      `${API_URL}/parent/v1/${vaccinationEventID}/${studentID}/declined`,
      { note: note },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchDeclineVaccineSuccess(response.data));
    } else {
      yield put(fetchDeclineVaccineFail(response.status));
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error("Decline Saga - Full Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    yield put(
      fetchDeclineVaccineFail({
        message: error.message,
        code: error.code,
        status: error.response?.status,
        data: error.response?.data,
      })
    );
  }
}

function* watchFetchDeclineVaccine() {
  yield takeLatest(FETCH_DECLINE_VACCINE, getVaccineParentDeclineSaga);
}
export default watchFetchDeclineVaccine;
