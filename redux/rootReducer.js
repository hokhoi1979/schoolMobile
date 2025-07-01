import { combineReducers } from "@reduxjs/toolkit";
import accountReducers from "./auth/authSlice";
import vaccineReducer from "./nurse/vaccine/fetchVaccine/fetchVaccineSlice";
import vaccineStudentReducer from "./nurse/vaccine/fetchVaccineDetail/fetchVaccineDetailSLice";
const rootReducer = combineReducers({
  account: accountReducers,

  // nurse
  vaccine: vaccineReducer,
  vaccineStudent: vaccineStudentReducer,
});
export default rootReducer;
