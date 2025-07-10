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
  ]);
}
