import {
  actionChannel,
  call,
  put,
  select,
  takeLatest,
} from "redux-saga/effects";
import axios from "axios";
import {
  PUT__MANAGER__VACCINE,
  putManagerSucessMedical,
  putMangerFailMedical,
} from "./updateVaccineManagerSlice";
import {
  fetchVaccineManagerFail,
  fetchVaccineManagerSuccess,
} from "../getAllVaccineManager/getAllVaccineManagerSlice";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* updateVaccineManagerSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { id, ...data } = action.payload;
    const response = yield call(
      axios.put,
      `${API_URL}/manager/v1/vaccinationEvent/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(putManagerSucessMedical(response.data));
      const fetchData = yield call(
        axios.get,
        `${API_URL}/manager/v1/vaccinationEvent`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (fetchData.status === 200 || fetchData.status === 201) {
        console.log("DUCC", fetchData.data);

        yield put(fetchVaccineManagerSuccess(fetchData.data));
      } else {
        yield put(fetchVaccineManagerFail(fetchData.status));
      }
    } else {
      yield put(putMangerFailMedical(response.status));
    }
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || error.message || "Unknown error";
    yield put(putMangerFailMedical(errMsg));
    console.log(error);
  }
}

function* watchPutVaccineManager() {
  yield takeLatest(PUT__MANAGER__VACCINE, updateVaccineManagerSaga);
}

export default watchPutVaccineManager;
