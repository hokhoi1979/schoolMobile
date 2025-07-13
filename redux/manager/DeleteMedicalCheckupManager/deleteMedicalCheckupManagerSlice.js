// Action Types
export const DELETE__MANAGER__MEDICAL__CHECKUP =
  "DELETE__MANAGER__MEDICAL__CHECKUP";
export const DELETE__MANAGER__MEDICAL__CHECKUP__SC =
  "DELETE__MANAGER__MEDICAL__CHECKUP__SC";
export const DELETE__MANAGER__MEDICAL__CHECKUP__FL =
  "DELETE__MANAGER__MEDICAL__CHECKUP__FL";

// Actions
export const deleteManagerMedicalCheckup = (data) => ({
  type: DELETE__MANAGER__MEDICAL__CHECKUP,
  payload: data,
});

export const deleteManagerMedicalCheckupSuccess = (data) => ({
  type: DELETE__MANAGER__MEDICAL__CHECKUP__SC,
  payload: data,
});

export const deleteManagerMedicalCheckupFail = (error) => ({
  type: DELETE__MANAGER__MEDICAL__CHECKUP__FL,
  payload: error,
});

// Initial State
const initialState = {
  deletedMedicalCheckup: [],
  loading: false,
  error: null,
};

// Reducer
const deleteMedicalCheckupManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE__MANAGER__MEDICAL__CHECKUP:
      return { ...state, loading: true, error: null };
    case DELETE__MANAGER__MEDICAL__CHECKUP__SC:
      return {
        ...state,
        loading: false,
        deletedMedicalCheckup: action.payload,
      };
    case DELETE__MANAGER__MEDICAL__CHECKUP__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default deleteMedicalCheckupManagerReducer;
