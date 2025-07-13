export const POST__MANAGER__VACCINE = "POST__MANAGER__MEDICAL";
export const POST__MANAGER__VACCINE__SC = "POST__MANAGER__VACCINE__SC";
export const POST__MANAGER__VACCINE__FL = "POST__MANAGER__VACCINE__FL";

export const postManagerVaccine = (data) => ({
  type: POST__MANAGER__VACCINE,
  payload: data,
});
export const postManagerSucessVaccine = (data) => ({
  type: POST__MANAGER__VACCINE__SC,
  payload: data,
});

export const postMangerFailVaccine = (error) => ({
  type: POST__MANAGER__VACCINE__FL,
  payload: error,
});
const initialState = {
  vaccine: [],
  loading: false,
  error: null,
};

const managerPostVaccineReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST__MANAGER__VACCINE:
      return { ...state, loading: true, error: null };
    case POST__MANAGER__VACCINE__SC:
      return { ...state, loading: false, vaccine: action.payload };
    case POST__MANAGER__VACCINE__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default managerPostVaccineReducer;
