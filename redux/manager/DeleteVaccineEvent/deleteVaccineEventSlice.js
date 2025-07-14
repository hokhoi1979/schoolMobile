export const DELETE__MANAGER__VACCINE = "DELETE__MANAGER__MEDICAL";
export const DELETE__MANAGER__VACCINE__SC = "DELETE__MANAGER__VACCINE__SC";
export const DELETE__MANAGER__VACCINE__FL = "DELETE__MANAGER__VACCINE__FL";

export const deleteManagerVaccine = (data) => ({
  type: DELETE__MANAGER__VACCINE,
  payload: data,
});
export const deleteManagerSucessVaccine = (data) => ({
  type: DELETE__MANAGER__VACCINE__SC,
  payload: data,
});

export const deleteMangerFailVaccine = (error) => ({
  type: DELETE__MANAGER__VACCINE__FL,
  payload: error,
});

const initialState = {
  vaccineDelete: [],
  loading: false,
  error: null,
};

const managerDeleteVaccineReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE__MANAGER__VACCINE:
      return { ...state, loading: true, error: null };
    case DELETE__MANAGER__VACCINE__SC:
      return { ...state, loading: false, vaccineDelete: action.payload };
    case DELETE__MANAGER__VACCINE__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default managerDeleteVaccineReducer;
