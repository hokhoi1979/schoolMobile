// Action Types
export const PUT__MANAGER__MEDICAL__CHECKUP = "PUT__MANAGER__MEDICAL__CHECKUP";
export const PUT__MANAGER__MEDICAL__CHECKUP__SC =
  "PUT__MANAGER__MEDICAL__CHECKUP__SC";
export const PUT__MANAGER__MEDICAL__CHECKUP__FL =
  "PUT__MANAGER__MEDICAL__CHECKUP__FL";

// Actions
export const putManagerMedicalCheckup = (data) => ({
  type: PUT__MANAGER__MEDICAL__CHECKUP,
  payload: data,
});

export const putManagerSuccessMedicalCheckup = (data) => ({
  type: PUT__MANAGER__MEDICAL__CHECKUP__SC,
  payload: data,
});

export const putManagerFailMedicalCheckup = (error) => ({
  type: PUT__MANAGER__MEDICAL__CHECKUP__FL,
  payload: error,
});

// Initial State
const initialState = {
  medicalCheckupUpdate: [],
  loading: false,
  error: null,
};

// Reducer
const managerUpdateMedicalCheckupReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT__MANAGER__MEDICAL__CHECKUP:
      return { ...state, loading: true, error: null };
    case PUT__MANAGER__MEDICAL__CHECKUP__SC:
      return { ...state, loading: false, medicalCheckupUpdate: action.payload };
    case PUT__MANAGER__MEDICAL__CHECKUP__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default managerUpdateMedicalCheckupReducer;
