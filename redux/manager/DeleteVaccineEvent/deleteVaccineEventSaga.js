import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { Alert } from "react-native";
import {
  DELETE__MANAGER__VACCINE,
  deleteManagerSucessVaccine,
  deleteMangerFailVaccine,
} from "./deleteVaccineEventSlice";
import {
  fetchVaccineManagerFail,
  fetchVaccineManagerSuccess,
} from "../getAllVaccineManager/getAllVaccineManagerSlice";
import Toast from "react-native-toast-message";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function* managerDeleteVaccineSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const id = action.payload;

    const response = yield call(
      axios.delete,
      `${API_URL}/manager/v1/vaccinationEvent/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(deleteManagerSucessVaccine(response.data));
      Toast.show({
        type: "success",
        text1: "Delete Success",
      });

      const fetchData = yield call(
        axios.get,
        `${API_URL}/manager/v1/vaccinationEvent`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (fetchData.status === 200 || fetchData.status === 201) {
        yield put(fetchVaccineManagerSuccess(fetchData.data));
      } else {
        yield put(fetchVaccineManagerFail(fetchData.status));
      }
    } else {
      yield put(deleteMangerFailVaccine(`API ERROR: ${response.data}`));
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Unknown error";
    yield put(deleteMangerFailVaccine(errorMessage));
    Toast.show({
      type: "error",
      text1: errorMessage,
    });
  }
}

function* watchDeleteManagerVaccine() {
  yield takeLatest(DELETE__MANAGER__VACCINE, managerDeleteVaccineSaga);
}

export default watchDeleteManagerVaccine;
