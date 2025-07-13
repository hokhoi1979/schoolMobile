import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__CLASS__MANAGER,
  fetchClassManagerFail,
  fetchClassManagerSucess,
} from "./getAllClassManagerSlice";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* classManagerSaga() {
  try {
    const token = yield select((state) => state.account.token);
    const response = yield call(axios.get, `${API_URL}/manager/v1/class`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      console.log("DUCC", response.data);

      yield put(fetchClassManagerSucess(response.data));
    } else {
      yield put(fetchClassManagerFail(response.status));
    }
  } catch (error) {
    yield put(fetchClassManagerFail(error));
  }
}

function* watchFetchClassManager() {
  yield takeLatest(FETCH__CLASS__MANAGER, classManagerSaga);
}

export default watchFetchClassManager;
