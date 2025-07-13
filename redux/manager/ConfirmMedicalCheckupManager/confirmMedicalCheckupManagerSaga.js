// confirmMedicalCheckupManagerSaga.js
import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";

import Toast from "react-native-toast-message";
import {
  PATCH__MANAGER__CONFIRM__CHECKUP,
  patchManagerFailConfirmCheckup,
  patchManagerSuccessConfirmCheckup,
} from "./confirmMedicalCheckupManagerSlice";
import {
  fetchCheckupManagerFail,
  fetchCheckupManagerSuccess,
} from "../GetAllMedicalCheckUpManager/getAllCheckUpManagerSlice";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* patchCheckupConfirmManagerSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { id, ...restPayload } = action.payload;

    const response = yield call(
      axios.put,
      `${API_URL}/manager/v1/check-up/${id}`,
      restPayload,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(patchManagerSuccessConfirmCheckup(response.data));
      Toast.show({
        type: "success",
        text1: "Xác nhận thành công",
        text2: "Email đã được gửi đến phụ huynh",
      });

      const fetchData = yield call(
        axios.get,
        `${API_URL}/manager/v1/check-up`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (fetchData.status === 200 || fetchData.status === 201) {
        yield put(fetchCheckupManagerSuccess(fetchData.data));
      } else {
        yield put(fetchCheckupManagerFail(fetchData.status));
      }
    } else {
      yield put(patchManagerFailConfirmCheckup(response.status));
    }
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || error.message || "Unknown error";
    yield put(patchManagerFailConfirmCheckup(errMsg));
    console.log(errMsg);
    Toast.show({
      type: "error",
      text1: "Xác nhận thất bại",
      text2: "Có lỗi xảy ra, vui lòng thử lại",
    });
  }
}

function* watchPatchCheckupConfirmManager() {
  yield takeLatest(
    PATCH__MANAGER__CONFIRM__CHECKUP,
    patchCheckupConfirmManagerSaga
  );
}

export default watchPatchCheckupConfirmManager;
