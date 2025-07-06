import { all } from "redux-saga/effects";
import watchFetchLogin from "./auth/authSaga";
import watchFetchVaccine from "./nurse/vaccine/fetchVaccine/fetchVaccineSaga";
import watchFetchVaccineStudent from "./nurse/vaccine/fetchVaccineDetail/fetchVaccineDetailSaga";
import watchUpdateVaccineResult from "./nurse/vaccine/updateVaccineResult/updateVaccineResultSaga";
import watchFetchVaccineResult from "./nurse/vaccine/vaccineResult/vaccineResultSaga";
import watchPostResultSaga from "./nurse/vaccine/sendVaccineResult/sendResultSaga";
import watchFetchCheckup from "./nurse/checkup/fetchChekup/checkupSaga";
import watchFetchStudentCheckup from "./nurse/checkup/fetchCheckupDetail/checkupDetailSaga";
import watchCheckupJoin from "./nurse/checkup/checkupJoin/checkupJoinSaga";
import watchPostCheckupResult from "./nurse/checkup/sendCheckupDetailResult/sendCheckupDetailResultSaga";
import watchCheckupDetailResult from "./nurse/checkup/checkupDetailResult/checkupDetailResultSaga";
// import watchFetchStudentCheckup from "./nurse/checkup/fetchCheckupDetail/CheckupDetailSaga";

export default function* rootSaga() {
  yield all([
    watchFetchLogin(),
    watchFetchVaccine(),
    watchFetchVaccineStudent(),
    watchUpdateVaccineResult(),
    watchFetchVaccineResult(),
    watchPostResultSaga(),
    watchFetchCheckup(),
    watchFetchStudentCheckup(),
    watchCheckupJoin(),
    watchPostCheckupResult(),
    watchCheckupDetailResult(),
  ]);
}
