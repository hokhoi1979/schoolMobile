import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import Toast from "react-native-toast-message";

import {
  fetchCheckupManagerFail,
  fetchCheckupManagerSuccess,
} from "../GetAllMedicalCheckUpManager/getAllCheckUpManagerSlice";
import {
  POST__MANAGER__CHECKUP,
  postManagerFailCheckup,
  postManagerSuccessCheckup,
} from "../PostCheckUpManager/postCheckUpManagerSlice.js";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* managerCheckupSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const body = action.payload;

    const response = yield call(
      axios.post,
      `${API_URL}/manager/v1/check-up`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(postManagerSuccessCheckup(response.data));
      Toast.show({
        type: "success",
        text1: "Create Check Up Success",
      });

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
      yield put(postManagerFailCheckup(`API ERROR: ${response.status}`));
    }
  } catch (error) {
    yield put(postManagerFailCheckup(`API ERROR: ${error}`));
    console.log(error);
    const message =
      error.response?.data?.message ||
      error.message ||
      "Đã xảy ra lỗi. Vui lòng thử lại.";
    Toast.show({
      type: "error",
      text1: message,
    });
  }
}

function* watchPostManagerCheckup() {
  yield takeLatest(POST__MANAGER__CHECKUP, managerCheckupSaga);
}

export default watchPostManagerCheckup;
