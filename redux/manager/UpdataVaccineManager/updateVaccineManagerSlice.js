export const PUT__MANAGER__VACCINE = "PUT__MANAGER__VACCINE";
export const PUT__MANAGER__VACCINE__SC = "PUT__MANAGER__VACCINE__SC";
export const PUT__MANAGER__VACCINE__FL = "PUT__MANAGER__VACCINE__FL";

export const putManagerMedical = (data) => ({
  type: PUT__MANAGER__VACCINE,
  payload: data,
});

export const putManagerSucessMedical = (data) => ({
  type: PUT__MANAGER__VACCINE__SC,
  payload: data,
});

export const putMangerFailMedical = (error) => ({
  type: PUT__MANAGER__VACCINE__FL,
  payload: error,
});
const initialState = {
  vaccineUpdate: [],
  loading: false,
  error: null,
};

const managerUpdateMedicalReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT__MANAGER__VACCINE:
      return { ...state, loading: true, error: null };
    case PUT__MANAGER__VACCINE__SC:
      return { ...state, loading: false, vaccineUpdate: action.payload };
    case PUT__MANAGER__VACCINE__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default managerUpdateMedicalReducer;
