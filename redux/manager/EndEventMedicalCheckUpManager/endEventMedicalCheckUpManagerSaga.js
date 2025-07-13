import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PATCH__MANAGER__END__MEDICAL__CHECKUP,
  patchManagerFailEndMedicalCheckup,
  patchManagerSuccessEndMedicalCheckup,
} from "./endEventMedicalCheckUpManagerSlice";
import {
  fetchCheckupManagerFail,
  fetchCheckupManagerSuccess,
} from "../GetAllMedicalCheckUpManager/getAllCheckUpManagerSlice";
import Toast from "react-native-toast-message";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* patchEndMedicalCheckupManagerSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const id = action.payload;

    const response = yield call(
      axios.patch,
      `${API_URL}/manager/v1/check-up/${id}/success`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(patchManagerSuccessEndMedicalCheckup(response.data));
      Toast.success("End Event Success");

      const fetch = yield call(axios.get, `${API_URL}/manager/v1/check-up`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (fetch.status === 200 || fetch.status === 201) {
        yield put(fetchCheckupManagerSuccess(fetch.data));
      } else {
        yield put(fetchCheckupManagerFail(fetch.status));
      }
    } else {
      yield put(patchManagerFailEndMedicalCheckup(response.status));
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Đã có lỗi xảy ra";
    Toast.error(`End MedicalCheckup Fail: ${errorMessage}`);
    yield put(patchManagerFailEndMedicalCheckup(errorMessage));
    console.error("Create Vaccine Error:", error);
  }
}

function* watchPatchEndMedicalCheckupManager() {
  yield takeLatest(
    PATCH__MANAGER__END__MEDICAL__CHECKUP,
    patchEndMedicalCheckupManagerSaga
  );
}

export default watchPatchEndMedicalCheckupManager;
