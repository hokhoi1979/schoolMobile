import { combineReducers } from "@reduxjs/toolkit";
import accountReducers from "./auth/authSlice";
import vaccineReducer from "./nurse/vaccine/fetchVaccine/fetchVaccineSlice";
import vaccineStudentReducer from "./nurse/vaccine/fetchVaccineDetail/fetchVaccineDetailSLice";
import updateVaccineReducer from "./nurse/vaccine/updateVaccineResult/updateVaccineResultSlice";
import vaccineResultReducer from "./nurse/vaccine/vaccineResult/vaccineResultSlice";
import sendResultVaccineReducer from "./nurse/vaccine/sendVaccineResult/sendResultSlice";
import checkupReducer from "./nurse/checkup/fetchChekup/checkupSlice";
import studentCheckupReducer from "./nurse/checkup/fetchCheckupDetail/checkupDetailSlice";
import checkupJoinReducer from "./nurse/checkup/checkupJoin/checkupJoinSlice";
import postCheckupDetailResultReducer from "./nurse/checkup/sendCheckupDetailResult/sendCheckupDetailResultSlice";
import fetchCheckupDetailResultReducer from "./nurse/checkup/checkupDetailResult/checkupDetailResultSlice";
import checkupResultReducer from "./nurse/checkup/fetchCheckupResult/resultCheckupSlice";
import sendCheckupParentReducer from "./nurse/checkup/sendCheckupResult/sendCheckupParentSlice";
const rootReducer = combineReducers({
  account: accountReducers,

  // nurse
  vaccine: vaccineReducer,
  vaccineStudent: vaccineStudentReducer,
  updateVaccine: updateVaccineReducer,
  vaccineResult: vaccineResultReducer,
  sendResultVaccine: sendResultVaccineReducer,
  checkup: checkupReducer,
  studentCheckup: studentCheckupReducer,
  checkupJoin: checkupJoinReducer,
  postCheckupDetailResult: postCheckupDetailResultReducer,
  fetchCheckupDetailResult: fetchCheckupDetailResultReducer,
  checkupResult: checkupResultReducer,
  sendCheckupParent: sendCheckupParentReducer,
});
export default rootReducer;
