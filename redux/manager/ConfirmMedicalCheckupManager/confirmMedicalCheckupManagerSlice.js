// confirmMedicalCheckupManagerSlice.js
export const PATCH__MANAGER__CONFIRM__CHECKUP =
  "PATCH__MANAGER__CONFIRM__CHECKUP";
export const PATCH__MANAGER__CONFIRM__CHECKUP__SC =
  "PATCH__MANAGER__CONFIRM__CHECKUP__SC";
export const PATCH__MANAGER__CONFIRM__CHECKUP__FL =
  "PATCH__MANAGER__CONFIRM__CHECKUP__FL";

export const patchManagerConfirmCheckup = (data) => ({
  type: PATCH__MANAGER__CONFIRM__CHECKUP,
  payload: data,
});

export const patchManagerSuccessConfirmCheckup = (data) => ({
  type: PATCH__MANAGER__CONFIRM__CHECKUP__SC,
  payload: data,
});

export const patchManagerFailConfirmCheckup = (error) => ({
  type: PATCH__MANAGER__CONFIRM__CHECKUP__FL,
  payload: error,
});

const initialState = {
  checkupConfirm: [],
  loading: false,
  error: null,
};

const patchManagerConfirmCheckupReducer = (state = initialState, action) => {
  switch (action.type) {
    case PATCH__MANAGER__CONFIRM__CHECKUP:
      return { ...state, loading: true, error: null };
    case PATCH__MANAGER__CONFIRM__CHECKUP__SC:
      return { ...state, loading: false, checkupConfirm: action.payload };
    case PATCH__MANAGER__CONFIRM__CHECKUP__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default patchManagerConfirmCheckupReducer;
