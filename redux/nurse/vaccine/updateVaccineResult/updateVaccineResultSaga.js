import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  UPDATE__RESULT__VACCINE,
  updateVaccineResultFail,
  updateVaccineResultSuccess,
} from "./updateVaccineResultSlice";
import Toast from "react-native-toast-message";
import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_API_URL;
console.log("SUCESS");
function* updateVaccineSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const { IdVaccine, bodyVaccine } = action.payload;
    const response = yield call(
      axios.post,
      `${API_URL}/nurse/v1/${IdVaccine}/result`,
      bodyVaccine,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(updateVaccineResultSuccess(response.data));
      Toast.show({
        type: "success",
        text1: "Đã cập nhật thành công!",
      });
      console.log("SUCCESS");
    } else {
      yield put(updateVaccineResultFail(response.status));
    }
  } catch (error) {
    console.log("❌ ERROR from updateVaccineSaga:");
    console.log("🔻 Full error:", error);
    console.log("🔻 Response:", error?.response?.data);

    yield put(
      updateVaccineResultFail(
        error?.response?.data?.message || error.message || "Unknown error"
      )
    );
    Toast.show({
      type: "error",
      text1: "You have already updated!",
    });
  }
}

function* watchUpdateVaccineResult() {
  yield takeLatest(UPDATE__RESULT__VACCINE, updateVaccineSaga);
}

export default watchUpdateVaccineResult;
