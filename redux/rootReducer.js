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

import checkupResultReducer from "./nurse/checkup/fetchCheckupResult/resultCheckupSlice";
import sendCheckupParentReducer from "./nurse/checkup/sendCheckupResult/sendCheckupParentSlice";

import getClassManagerReducer from "./manager/ClassManager/getAllClassManagerSlice";
import patchManagerConfirmCheckupReducer from "./manager/ConfirmMedicalCheckupManager/confirmMedicalCheckupManagerSlice";
import patchManagerConfirmVaccineReducer from "./manager/ConfirmVaccineManager/ConfirmVaccineManagerSlice";
import managerPostVaccineReducer from "./manager/CreateVaccineManager/createVaccineManagerSlice";
import deleteMedicalCheckupManagerReducer from "./manager/DeleteMedicalCheckupManager/deleteMedicalCheckupManagerSlice";
import managerDeleteVaccineReducer from "./manager/DeleteVaccineEvent/deleteVaccineEventSlice";
import endEventMedicalCheckUpManagerReducer from "./manager/EndEventMedicalCheckUpManager/endEventMedicalCheckUpManagerSlice";
import getAllCheckupManagerReducer from "./manager/GetAllMedicalCheckUpManager/getAllCheckUpManagerSlice";
import vaccineManagerReducer from "./manager/getAllVaccineManager/getAllVaccineManagerSlice";
import getMedicineSupplyManagerReducer from "./manager/GetMedicineAndSupplyManager/getMedicineAndSupplyManagerSlice";
import getTotalStudentSlice from "./manager/GetTotalStudent/getTotalStudentSlice";
import managerCheckupReducer from "./manager/PostCheckUpManager/postCheckUpManagerSlice";
import patchManagerVaccineReducer from "./manager/successVaccineManager/successVaccineManagerSlice";
import managerUpdateMedicalReducer from "./manager/UpdataVaccineManager/updateVaccineManagerSlice";
import managerUpdateMedicalCheckupReducer from "./manager/UpdateMedicalCheckupManager/updateMedicalCheckupManagerSlice";

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
  checkupResult: checkupResultReducer,
  sendCheckupParent: sendCheckupParentReducer,

  //Manager
  getClassManager: getClassManagerReducer,
  patchManagerConfirmCheckup: patchManagerConfirmCheckupReducer,
  patchManagerConfirmVaccine: patchManagerConfirmVaccineReducer,
  managerPostVaccine: managerPostVaccineReducer,
  deleteMedicalCheckupManager: deleteMedicalCheckupManagerReducer,
  managerDeleteVaccine: managerDeleteVaccineReducer,
  endEventMedicalCheckUpManager: endEventMedicalCheckUpManagerReducer,
  getAllCheckupManager: getAllCheckupManagerReducer,
  vaccineManager: vaccineManagerReducer,
  getMedicineSupplyManager: getMedicineSupplyManagerReducer,
  getTotalStudent: getTotalStudentSlice,
  managerCheckup: managerCheckupReducer,
  patchManagerVaccine: patchManagerVaccineReducer,
  managerUpdateMedical: managerUpdateMedicalReducer,
  managerUpdateMedicalCheckup: managerUpdateMedicalCheckupReducer,
});
export default rootReducer;
