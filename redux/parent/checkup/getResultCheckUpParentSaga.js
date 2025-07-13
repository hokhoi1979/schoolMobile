import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_RESULT_CHECK_UP_PARENT,
  fetchResultCheckUpParentSuccess,
  fetchResultCheckUpParentFail,
} from "./getResultCheckUpParentSlice";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* resultCheckUpParentSaga(action) {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const { id, studentID } = action.payload;
    const response = yield call(
      axios.get,
      `${API_URL}/parent/v1/check-up/${id}/result/${studentID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("he", response);
    if (response.status === 200 || response.status === 201) {
      yield put(fetchResultCheckUpParentSuccess(response.data));
    } else {
      yield put(fetchResultCheckUpParentFail(response.data));
    }
  } catch (error) {
    yield put(fetchResultCheckUpParentFail(error));
  }
}

function* watchFetchResultCheckUpParent() {
  yield takeLatest(FETCH_RESULT_CHECK_UP_PARENT, resultCheckUpParentSaga);
}
export default watchFetchResultCheckUpParent;
