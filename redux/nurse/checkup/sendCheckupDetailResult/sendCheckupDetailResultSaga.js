import axios from "axios";

import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  POST__CHECKUP__DETAIL_RESULT,
  postCheckupDetailResultFail,
  postCheckupDetailResultSuccess,
} from "./sendCheckupDetailResultSlice";

import Toast from "react-native-toast-message";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* postCheckupDetailResultSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const { id, body } = action.payload;
    const response = yield call(
      axios.post,
      `${API_URL}/nurse/v1/check-up/${id}/result`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(postCheckupDetailResultSuccess(response.data));
      Toast.show({
        type: "success",
        text1: "Update result successful!",
      });
    } else {
      yield put(postCheckupDetailResultFail(response.status));
      console.log(response.status);
    }
  } catch (error) {
    yield put(
      postCheckupDetailResultFail(error.response?.data || error.message)
    );
  }
}

function* watchPostCheckupResult() {
  yield takeLatest(POST__CHECKUP__DETAIL_RESULT, postCheckupDetailResultSaga);
}

export default watchPostCheckupResult;
