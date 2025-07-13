import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__CHECKUP__MANAGER,
  fetchCheckupManagerFail,
  fetchCheckupManagerSuccess,
} from "./getAllCheckUpManagerSlice";
import { Alert } from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* getAllCheckUpManagerSaga() {
  try {
    const token = yield select((state) => state.account.token);
    console.log("🩺 Checkup Saga Token:", token);

    const response = yield call(axios.get, `${API_URL}/manager/v1/check-up`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      yield put(fetchCheckupManagerSuccess(response.data));
    } else {
      yield put(
        fetchCheckupManagerFail({ message: `Status: ${response.status}` })
      );
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Unknown error";

    Alert.alert("Fetch Fail", errorMessage);

    yield put(
      fetchCheckupManagerFail({
        message: errorMessage,
        status: error?.response?.status || 0,
      })
    );
  }
}

function* watchFetchCheckupManager() {
  yield takeLatest(FETCH__CHECKUP__MANAGER, getAllCheckUpManagerSaga);
}

export default watchFetchCheckupManager;
