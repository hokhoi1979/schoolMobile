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
import watchFetchCheckupResult from "./nurse/checkup/fetchCheckupResult/resultCheckupSaga";
import watchSendCheckupParent from "./nurse/checkup/sendCheckupResult/sendCheckupParentSaga";
import watchFetchClassManager from "./manager/ClassManager/getAllClassManagerSaga";
import watchPatchCheckupConfirmManager from "./manager/ConfirmMedicalCheckupManager/confirmMedicalCheckupManagerSaga";
import watchPatchVaccineConfirmManager from "./manager/ConfirmVaccineManager/ConfirmVaccineManagerSaga";
import watchPostManagerVaccine from "./manager/CreateVaccineManager/createVaccineManagerSaga";
import watchDeleteManagerMedicalCheckup from "./manager/DeleteMedicalCheckupManager/deleteMedicalCheckupManagerSaga";
import watchDeleteManagerVaccine from "./manager/DeleteVaccineEvent/deleteVaccineEventSaga";
import watchPatchEndMedicalCheckupManager from "./manager/EndEventMedicalCheckUpManager/endEventMedicalCheckUpManagerSaga";
import watchFetchCheckupManager from "./manager/GetAllMedicalCheckUpManager/getAllCheckUpManagerSaga";
import watchFetchVaccineManager from "./manager/getAllVaccineManager/getAllVaccineManagerSaga";
import watchFetchMedicineSuppplyManager from "./manager/GetMedicineAndSupplyManager/getMedicineAndSupplyManagerSaga";
import totalStudentSaga from "./manager/GetTotalStudent/getTotalStudentSaga";
import watchPostManagerCheckup from "./manager/PostCheckUpManager/postCheckUpManagerSaga";
import watchPatchVaccineManager from "./manager/successVaccineManager/successVaccineManagerSaga";
import watchPutVaccineManager from "./manager/UpdataVaccineManager/updateVaccineManagerSaga";
import watchUpdateMedicalCheckupManager from "./manager/UpdateMedicalCheckupManager/updateMedicalCheckupManagerSaga";
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
    watchFetchCheckupResult(),
    watchSendCheckupParent(),

    //Manager
    watchFetchClassManager(),
    watchPatchCheckupConfirmManager(),
    watchPatchVaccineConfirmManager(),
    watchPostManagerVaccine(),
    watchDeleteManagerMedicalCheckup(),
    watchDeleteManagerVaccine(),
    watchPatchEndMedicalCheckupManager(),
    watchFetchCheckupManager(),
    watchFetchVaccineManager(),
    watchFetchMedicineSuppplyManager(),
    totalStudentSaga(),
    watchPostManagerCheckup(),
    watchPatchVaccineManager(),
    watchPutVaccineManager(),
    watchUpdateMedicalCheckupManager(),
  ]);
}
