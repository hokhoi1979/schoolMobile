export const PATCH__MANAGER__VACCINE = "PATCH__MANAGER__VACCINE";
export const PATCH__MANAGER__VACCINE__SC = "PATCH__MANAGER__VACCINE__SC";
export const PATCH__MANAGER__VACCINE__FL = "PATCH__MANAGER__VACCINE__FL";

export const patchManagerVaccine = (data) => ({
  type: PATCH__MANAGER__VACCINE,
  payload: data,
});
export const patchManagerSucessVaccine = (data) => ({
  type: PATCH__MANAGER__VACCINE__SC,
  payload: data,
});

export const patchMangerFailVaccine = (error) => ({
  type: PATCH__MANAGER__VACCINE__FL,
  payload: error,
});
const initialState = {
  vaccineSuccess: [],
  loading: false,
  error: null,
};

const patchManagerVaccineReducer = (state = initialState, action) => {
  switch (action.type) {
    case PATCH__MANAGER__VACCINE:
      return { ...state, loading: true, error: null };
    case PATCH__MANAGER__VACCINE__SC:
      return { ...state, loading: false, vaccineSuccess: action.payload };
    case PATCH__MANAGER__VACCINE__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default patchManagerVaccineReducer;
