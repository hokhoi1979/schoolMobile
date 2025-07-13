import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";

import {
  POST__RESULT__VACCINE,
  postResultVaccineFail,
  postResultVaccineSuccess,
} from "./sendResultSlice";
import {
  fetchVaccineResultFail,
  fetchVaccineResultSuccess,
} from "../vaccineResult/vaccineResultSlice";
import Toast from "react-native-toast-message";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* sendResultVaccineSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const id = action.payload;

    const response = yield call(
      axios.post,
      `${API_URL}/nurse/v1/${id}/notification/send-result`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(postResultVaccineSuccess(response.data));

      Toast.show({
        type: "success",
        text1: "Sent to parent successful!",
      });
      yield put(postResultVaccineSuccess(response.data));
      const fetchResponse = yield call(
        axios.get,
        `${API_URL}/nurse/v1/${id}/result`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (fetchResponse.status === 200 || fetchResponse.status === 201) {
        yield put(fetchVaccineResultSuccess(fetchResponse.data));
      } else {
        yield put(fetchVaccineResultFail(fetchResponse.status));
      }
    }
  } catch (error) {
    yield put(postResultVaccineFail(error));
  }
}

function* watchPostResultSaga() {
  yield takeLatest(POST__RESULT__VACCINE, sendResultVaccineSaga);
}

export default watchPostResultSaga;
