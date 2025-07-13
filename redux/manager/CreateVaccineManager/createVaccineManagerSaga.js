import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  POST__MANAGER__VACCINE,
  postManagerSucessVaccine,
  postMangerFailVaccine,
} from "./createVaccineManagerSlice";
import {
  fetchVaccineManagerFail,
  fetchVaccineManagerSuccess,
} from "../getAllVaccineManager/getAllVaccineManagerSlice";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* managerVaccineSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const body = action.payload;
    const response = yield call(
      axios.post,
      `${API_URL}/manager/v1/vaccinationEvent`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("DUCC", response.data);
      yield put(postManagerSucessVaccine(response.data));
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
        yield put(fetchVaccineManagerSuccess(fetchData.data));
        // toast.success("Create Vaccine Success");
      } else {
        yield put(fetchVaccineManagerFail(fetchData.status));
        // toast.error("Create Vaccine Fail ");
      }
    } else {
      yield put(postMangerFailVaccine(`API ERROR: ${response.data}`));
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Đã có lỗi xảy ra";
    // toast.error(`Create Vaccine Fail: ${errorMessage}`);
    yield put(postMangerFailVaccine(errorMessage));
    console.error("Create Vaccine Error:", error);
  }
}
function* watchPostManagerVaccine() {
  yield takeLatest(POST__MANAGER__VACCINE, managerVaccineSaga);
}

export default watchPostManagerVaccine;
