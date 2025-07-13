import { all } from "redux-saga/effects";
import watchFetchLogin from "./auth/authSaga";
import watchFetchVaccine from "./nurse/vaccine/fetchVaccine/fetchVaccineSaga";
import watchFetchVaccineStudent from "./nurse/vaccine/fetchVaccineDetail/fetchVaccineDetailSaga";

import watchFetchVaccineParent from "./parent/vaccine/getVaccineParentSaga";
import watchFetchAcceptVaccine from "./parent/vaccine/getVaccineParentAcceptSaga";
import watchFetchDeclineVaccine from "./parent/vaccine/getVaccineParentDeclineSaga";
import watchFetchVaccineParentResult from "./parent/vaccine/getVaccineParentResultSaga";
import watchFetchCheckUpParent from "./parent/checkup/getCheckUpParentSaga";
import watchFetchAcceptCheckUp from "./parent/checkup/getCheckUpParentAcceptSaga";
import watchFetchDeclineCheckUp from "./parent/checkup/getCheckUpParentDeclineSaga";
import watchFetchDetailCheckUpParent from "./parent/checkup/getDetailCheckUpParentSaga";
import watchFetchResultCheckUpParent from "./parent/checkup/getResultCheckUpParentSaga";
import watchUpdateVaccineResult from "./nurse/vaccine/updateVaccineResult/updateVaccineResultSaga";
import watchFetchVaccineResult from "./nurse/vaccine/vaccineResult/vaccineResultSaga";
import watchPostResultSaga from "./nurse/vaccine/sendVaccineResult/sendResultSaga";
import watchFetchCheckup from "./nurse/checkup/fetchChekup/checkupSaga";
import watchFetchStudentCheckup from "./nurse/checkup/fetchCheckupDetail/checkupDetailSaga";
import watchCheckupJoin from "./nurse/checkup/checkupJoin/checkupJoinSaga";
import watchPostCheckupResult from "./nurse/checkup/sendCheckupDetailResult/sendCheckupDetailResultSaga";
import watchCheckupDetailResult from "./nurse/checkup/checkupDetailResult/checkupDetailResultSaga";
import watchFetchCheckupResult from "./nurse/checkup/fetchCheckupResult/resultCheckupSaga";
import watchSendCheckupParent from "./nurse/checkup/sendCheckupResult/sendCheckupParentSaga";
// import watchFetchStudentCheckup from "./nurse/checkup/fetchCheckupDetail/CheckupDetailSaga";

export default function* rootSaga() {
  yield all([
    watchFetchLogin(),
    watchFetchVaccine(),
    watchFetchVaccineStudent(),

    watchFetchVaccineParent(),
    watchFetchAcceptVaccine(),
    watchFetchDeclineVaccine(),
    watchFetchVaccineParentResult(),
    watchFetchCheckUpParent(),
    watchFetchAcceptCheckUp(),
    watchFetchDeclineCheckUp(),
    watchFetchDetailCheckUpParent(),
    watchFetchResultCheckUpParent(),

    watchUpdateVaccineResult(),
    watchFetchVaccineResult(),
    watchPostResultSaga(),
    watchFetchCheckup(),
    watchFetchStudentCheckup(),
    watchCheckupJoin(),
    watchPostCheckupResult(),
    watchCheckupDetailResult(),
    watchFetchCheckupResult(),
    watchSendCheckupParent(),
  ]);
}
