import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__MEDICINE__SUPPLY__MANAGER,
  fetchMedicineSupplyManagerFail,
  fetchMedicineSupplyManagerSucess,
} from "./getMedicineAndSupplyManagerSlice";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* medicineSupplyManagerSaga() {
  try {
    const token = yield select((state) => state.account.token);
    const response = yield call(axios.get, `${API_URL}/manager/v1/medicines`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("hdushdiu");
    console.log(">>>>>>>", response);

    if (response.status === 200 || response.status === 201) {
      yield put(fetchMedicineSupplyManagerSucess(response.data));
    } else {
      yield put(fetchMedicineSupplyManagerFail(response.status));
    }
  } catch (error) {
    yield put(fetchMedicineSupplyManagerFail(error));
  }
}

function* watchFetchMedicineSuppplyManager() {
  yield takeLatest(FETCH__MEDICINE__SUPPLY__MANAGER, medicineSupplyManagerSaga);
}

export default watchFetchMedicineSuppplyManager;
