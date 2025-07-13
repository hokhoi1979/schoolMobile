import axios from "axios";
import { put, select, takeLatest, call } from "redux-saga/effects";
import {
  FETCH__ALL__VACCINE__MANAGER,
  fetchVaccineManagerFail,
  fetchVaccineManagerSuccess,
} from "./getAllVaccineManagerSlice";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* vaccineManagerSaga() {
  try {
    const token = yield select((state) => state.account.token);

    const response = yield call(
      axios.get,
      `${API_URL}/manager/v1/vaccinationEvent`,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchVaccineManagerSuccess(response.data));
      console.log("FetchSuccess", response.data);
    } else {
      yield put(fetchVaccineManagerFail(`API ERROR: ${response.data}`));
      console.log(error);
    }
  } catch (error) {
    yield put(fetchVaccineManagerFail(`API ERROR: ${error}`));
  }
}

function* watchFetchVaccineManager() {
  yield takeLatest(FETCH__ALL__VACCINE__MANAGER, vaccineManagerSaga);
}
export default watchFetchVaccineManager;
