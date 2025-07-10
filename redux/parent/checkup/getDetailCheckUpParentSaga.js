import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_DETAIL_CHECK_UP_PARENT,
  fetchDetailCheckUpParentSuccess,
  fetchDetailCheckUpParentFail,
} from "./getDetailCheckUpParentSlice";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* detailCheckUpParentSaga(action) {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const { id } = action.payload;
    const response = yield call(
      axios.get,
      `${API_URL}/parent/v1/check-up/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchDetailCheckUpParentSuccess(response.data));
    } else {
      yield put(fetchDetailCheckUpParentFail(response.data));
    }
  } catch (error) {
    yield put(fetchDetailCheckUpParentFail(error));
  }
}

function* watchFetchDetailCheckUpParent() {
  yield takeLatest(FETCH_DETAIL_CHECK_UP_PARENT, detailCheckUpParentSaga);
}
export default watchFetchDetailCheckUpParent;
