import { all } from "redux-saga/effects";
import watchFetchLogin from "./auth/authSaga";
import watchFetchVaccine from "./nurse/vaccine/fetchVaccine/fetchVaccineSaga";
import watchFetchVaccineStudent from "./nurse/vaccine/fetchVaccineDetail/fetchVaccineDetailSaga";

export default function* rootSaga() {
  yield all([
    watchFetchLogin(),
    watchFetchVaccine(),
    watchFetchVaccineStudent(),
  ]);
}
