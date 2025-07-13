import {
  actionChannel,
  call,
  put,
  select,
  takeLatest,
} from "redux-saga/effects";
import axios from "axios";
import {
  fetchVaccineManagerFail,
  fetchVaccineManagerSuccess,
} from "../getAllVaccineManager/getAllVaccineManagerSlice";
import {
  PATCH__MANAGER__VACCINE,
  patchManagerSucessVaccine,
  patchMangerFailVaccine,
} from "./successVaccineManagerSlice";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* patchVaccineManagerSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const id = action.payload;
    const response = yield call(
      axios.patch,
      `${API_URL}/manager/v1/${id}/success`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("DUCC", response.data);
      yield put(patchManagerSucessVaccine(response.data));
      const fetchData = yield call(
        axios.get,
        `${URL_API}/manager/v1/vaccinationEvent`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (fetchData.status === 200 || fetchData.status === 201) {
        yield put(fetchVaccineManagerSuccess(fetchData.data));
      } else {
        yield put(fetchVaccineManagerFail(fetchData.status));
      }
    } else {
      yield put(patchMangerFailVaccine(response.status));
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Đã có lỗi xảy ra";
    // toast.error(`Create Vaccine Fail: ${errorMessage}`);
    console.log(errorMessage);
    yield put(patchMangerFailVaccine(errorMessage));
    console.error("Create Vaccine Error:", error);
  }
}

function* watchPatchVaccineManager() {
  yield takeLatest(PATCH__MANAGER__VACCINE, patchVaccineManagerSaga);
}

export default watchPatchVaccineManager;
