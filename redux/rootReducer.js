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

import updateVaccineReducer from "./nurse/vaccine/updateVaccineResult/updateVaccineResultSlice";
import vaccineResultReducer from "./nurse/vaccine/vaccineResult/vaccineResultSlice";
import sendResultVaccineReducer from "./nurse/vaccine/sendVaccineResult/sendResultSlice";
import checkupReducer from "./nurse/checkup/fetchChekup/checkupSlice";
import studentCheckupReducer from "./nurse/checkup/fetchCheckupDetail/checkupDetailSlice";
import checkupJoinReducer from "./nurse/checkup/checkupJoin/checkupJoinSlice";
import postCheckupDetailResultReducer from "./nurse/checkup/sendCheckupDetailResult/sendCheckupDetailResultSlice";
import fetchCheckupDetailResultReducer from "./nurse/checkup/checkupDetailResult/checkupDetailResultSlice";

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

  updateVaccine: updateVaccineReducer,
  vaccineResult: vaccineResultReducer,
  sendResultVaccine: sendResultVaccineReducer,
  checkup: checkupReducer,
  studentCheckup: studentCheckupReducer,
  checkupJoin: checkupJoinReducer,
  postCheckupDetailResult: postCheckupDetailResultReducer,
  fetchCheckupDetailResult: fetchCheckupDetailResultReducer,
});
export default rootReducer;
