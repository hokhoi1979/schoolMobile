import { all } from "redux-saga/effects";
import watchFetchLogin from "./auth/authSaga";
import watchFetchVaccine from "./nurse/vaccine/fetchVaccine/fetchVaccineSaga";
import watchFetchVaccineStudent from "./nurse/vaccine/fetchVaccineDetail/fetchVaccineDetailSaga";
import watchUpdateVaccineResult from "./nurse/vaccine/updateVaccineResult/updateVaccineResultSaga";
import watchFetchVaccineResult from "./nurse/vaccine/vaccineResult/vaccineResultSaga";
import watchPostResultSaga from "./nurse/vaccine/sendVaccineResult/sendResultSaga";

export default function* rootSaga() {
  yield all([
    watchFetchLogin(),
    watchFetchVaccine(),
    watchFetchVaccineStudent(),
    watchUpdateVaccineResult(),
    watchFetchVaccineResult(),
    watchPostResultSaga(),
  ]);
}
