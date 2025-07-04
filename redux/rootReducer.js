import { combineReducers } from "@reduxjs/toolkit";
import accountReducers from "./auth/authSlice";
import vaccineReducer from "./nurse/vaccine/fetchVaccine/fetchVaccineSlice";
import vaccineStudentReducer from "./nurse/vaccine/fetchVaccineDetail/fetchVaccineDetailSLice";
import updateVaccineReducer from "./nurse/vaccine/updateVaccineResult/updateVaccineResultSlice";
import vaccineResultReducer from "./nurse/vaccine/vaccineResult/vaccineResultSlice";
import sendResultVaccineReducer from "./nurse/vaccine/sendVaccineResult/sendResultSlice";
const rootReducer = combineReducers({
  account: accountReducers,

  // nurse
  vaccine: vaccineReducer,
  vaccineStudent: vaccineStudentReducer,
  updateVaccine: updateVaccineReducer,
  vaccineResult: vaccineResultReducer,
  sendResultVaccine: sendResultVaccineReducer,
});
export default rootReducer;
