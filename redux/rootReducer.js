import { combineReducers } from "@reduxjs/toolkit";
import accountReducers from "./auth/authSlice";
import vaccineReducer from "./nurse/vaccine/fetchVaccine/fetchVaccineSlice";
import vaccineStudentReducer from "./nurse/vaccine/fetchVaccineDetail/fetchVaccineDetailSLice";
import vaccineParentReducer from "./parent/vaccine/getVaccineParentSlice";
import getVaccineParentAcceptReducer from "./parent/vaccine/getVaccineParentAcceptSlice";
import getVaccineParentDeclineReducer from "./parent/vaccine/getVaccineParentDeclineSlice";
import vaccineParentResultReducer from "./parent/vaccine/getVaccineParentResultSlice";
import checkupParentReducer from "./parent/checkup/getCheckUpParentSlice";
import getCheckUpParentAcceptReducer from "./parent/checkup/getCheckUpParentAcceptSlice";
import getCheckUpParentDeclineReducer from "./parent/checkup/getCheckUpParentDeclineSlice";
import detailCheckUpParentReducer from "./parent/checkup/getDetailCheckUpParentSlice";
import resultCheckUpParentReducer from "./parent/checkup/getResultCheckUpParentSlice";

const rootReducer = combineReducers({
  account: accountReducers,

  // nurse
  vaccine: vaccineReducer,
  vaccineStudent: vaccineStudentReducer,
  vaccineParent: vaccineParentReducer,
  vaccineParentAccept: getVaccineParentAcceptReducer,
  vaccineParentDecline: getVaccineParentDeclineReducer,
  vaccineParentResult: vaccineParentResultReducer,
  checkupParent: checkupParentReducer,
  checkupParentAccept: getCheckUpParentAcceptReducer,
  checkupParentDecline: getCheckUpParentDeclineReducer,
  detailCheckUpParent: detailCheckUpParentReducer,
  resultCheckUpParent: resultCheckUpParentReducer,
});
export default rootReducer;
