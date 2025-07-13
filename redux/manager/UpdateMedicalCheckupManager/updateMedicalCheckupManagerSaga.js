import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PUT__MANAGER__MEDICAL__CHECKUP,
  putManagerFailMedicalCheckup,
  putManagerSuccessMedicalCheckup,
} from "./updateMedicalCheckupManagerSlice";
import {
  fetchCheckupManagerFail,
  fetchCheckupManagerSuccess,
} from "../GetAllMedicalCheckUpManager/getAllCheckUpManagerSlice";

const URL_API = process.env.EXPO_PUBLIC_API_URL;

function* updateMedicalCheckupManagerSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { id, ...data } = action.payload;

    const response = yield call(
      axios.patch,
      `${URL_API}/manager/v1/check-up/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(putManagerSuccessMedicalCheckup(response.data));
      const fectch = yield call(axios.get, `${URL_API}/manager/v1/check-up`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (fectch.status === 200 || fectch.status === 201) {
        yield put(fetchCheckupManagerSuccess(fectch.data));
      } else {
        yield put(fetchCheckupManagerFail(fectch.status));
      }
    } else {
      yield put(putManagerFailMedicalCheckup(response.status));
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Đã có lỗi xảy ra";
    yield put(putManagerFailMedicalCheckup(errorMessage));
    console.error("Update Checkup Error:", errorMessage);
  }
}

function* watchUpdateMedicalCheckupManager() {
  yield takeLatest(
    PUT__MANAGER__MEDICAL__CHECKUP,
    updateMedicalCheckupManagerSaga
  );
}

export default watchUpdateMedicalCheckupManager;
