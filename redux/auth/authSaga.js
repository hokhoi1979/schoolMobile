import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchFail, fetchSuccess, FETCH_API_LOGIN } from "./authSlice";
import jwt_decode from "jwt-decode";
import Toast from "react-native-toast-message";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export function* fetchLogin(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_URL}/v1/auth/login`,
      action.payload
    );

    const accessToken = response.data?.data?.backendToken?.accessToken;
    console.log(response.data.data);

    if (accessToken) {
      const decodedUser = jwt_decode(accessToken);

      yield call(AsyncStorage.setItem, "accessToken", accessToken);

      yield put(
        fetchSuccess({
          user: decodedUser,
          token: accessToken,
        })
      );
      Toast.show({
        type: "success",
        text1: "Login successful!",
      });

      if (action.onSuccess) {
        yield call(action.onSuccess, response);
      }
    } else {
      throw new Error("Email or password is not correct! Try again");
    }
  } catch (error) {
    console.error("Login error:", error.response || error.message);

    let errorMessage = "Login failed!";
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    yield put(fetchFail(errorMessage));
  }
}

function* watchFetchLogin() {
  yield takeLatest(FETCH_API_LOGIN, fetchLogin);
}

export default watchFetchLogin;
