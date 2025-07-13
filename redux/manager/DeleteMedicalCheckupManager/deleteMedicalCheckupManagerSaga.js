import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";

import Toast from "react-native-toast-message";
import {
  DELETE__MANAGER__MEDICAL__CHECKUP,
  deleteManagerMedicalCheckupFail,
  deleteManagerMedicalCheckupSuccess,
} from "./deleteMedicalCheckupManagerSlice";
import {
  fetchCheckupManagerFail,
  fetchCheckupManagerSuccess,
} from "../GetAllMedicalCheckUpManager/getAllCheckUpManagerSlice";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* managerDeleteMedicalCheckupSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const id = action.payload;

    const response = yield call(
      axios.delete,
      `${API_URL}/manager/v1/check-up/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(deleteManagerMedicalCheckupSuccess(response.data));
      Toast.success("Delete Success");

      const fecthData = yield call(
        axios.get,
        `${API_URL}/manager/v1/check-up`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (fecthData.status === 200 || fecthData.status === 201) {
        yield put(fetchCheckupManagerSuccess(fecthData.data));
      } else {
        yield put(fetchCheckupManagerFail(fecthData.status));
      }
    } else {
      yield put(deleteManagerMedicalCheckupFail(`API ERROR: ${response.data}`));
      Toast.error("Delete Fail");
    }
  } catch (error) {
    yield put(
      deleteManagerMedicalCheckupFail(
        error?.response?.data?.message || error.message || "Unknown error"
      )
    );
    Toast.error("Đã xảy ra lỗi khi xóa nội dung kiểm tra");
  }
}

function* watchDeleteManagerMedicalCheckup() {
  yield takeLatest(
    DELETE__MANAGER__MEDICAL__CHECKUP,
    managerDeleteMedicalCheckupSaga
  );
}

export default watchDeleteManagerMedicalCheckup;
