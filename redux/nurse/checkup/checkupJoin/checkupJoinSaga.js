import axios from "axios";

import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH__CHECKUP__JOIN,
  fetchCheckupJoinFail,
  fetchCheckupJoinSuccess,
} from "./checkupJoinSlice";
const API_URL = process.env.EXPO_PUBLIC_API_URL;
console.log("HELLO");
function* checkupJoinSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const id = action.payload;
    const response = yield call(
      axios.get,
      `${API_URL}/nurse/v1/check-up/${id}/students-result-status`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchCheckupJoinSuccess(response.data));
    } else {
      yield put(fetchCheckupJoinFail(response.status));
    }
  } catch (error) {
    yield put(fetchCheckupJoinFail(error));
  }
}

function* watchCheckupJoin() {
  yield takeLatest(FETCH__CHECKUP__JOIN, checkupJoinSaga);
}

export default watchCheckupJoin;
