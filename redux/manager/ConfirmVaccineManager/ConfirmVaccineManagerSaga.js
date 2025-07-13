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
  PATCH__MANAGER__CONFIRM__VACCINE,
  patchManagerSucessConfirmVaccine,
  patchMangerFailConfirmVaccine,
} from "./ConfirmVaccineManagerSlice";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* patchVaccineConfirmManagerSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    console.log("TOKEN", token);
    const { id, customMailTitle, customMailBody } = action.payload;
    const response = yield call(
      axios.patch,
      `${API_URL}/manager/v1/vaccinationEvent/${id}`,
      { customMailTitle, customMailBody },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(patchManagerSucessConfirmVaccine(response.data));
      //   toast.success("Confirm Success");
      console.log("Create Success", response);

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
      yield put(patchMangerFailConfirmVaccine(response.status));
      toast.error("Confirm Error");
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Đã có lỗi xảy ra";
    // toast.error(`Confirm Vaccine Fail: ${errorMessage}`);
    console.log(errorMessage);
    yield put(patchMangerFailConfirmVaccine(errorMessage));
    console.error("Confirm Vaccine Error:", error);
  }
}

function* watchPatchVaccineConfirmManager() {
  yield takeLatest(
    PATCH__MANAGER__CONFIRM__VACCINE,
    patchVaccineConfirmManagerSaga
  );
}

export default watchPatchVaccineConfirmManager;
