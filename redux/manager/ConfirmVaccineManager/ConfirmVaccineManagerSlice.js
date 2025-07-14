export const PATCH__MANAGER__CONFIRM__VACCINE =
  "PATCH__MANAGER__CONFIRM__VACCINE";
export const PATCH__MANAGER__CONFIRM__VACCINE__SC =
  "PATCH__MANAGER__CONFIRM__VACCINE__SC";
export const PATCH__MANAGER__CONFIRM__VACCINE__FL =
  "PATCH__MANAGER__CONFIRM__VACCINE__FL";

export const patchManagerConfirmVaccine = (data) => ({
  type: PATCH__MANAGER__CONFIRM__VACCINE,
  payload: data,
});

export const patchManagerSucessConfirmVaccine = (data) => ({
  type: PATCH__MANAGER__CONFIRM__VACCINE__SC,
  payload: data,
});

export const patchMangerFailConfirmVaccine = (error) => ({
  type: PATCH__MANAGER__CONFIRM__VACCINE__FL,
  payload: error,
});
const initialState = {
  vaccineConfirm: [],
  loading: false,
  error: null,
};

const patchManagerConfirmVaccineReducer = (state = initialState, action) => {
  switch (action.type) {
    case PATCH__MANAGER__CONFIRM__VACCINE:
      return { ...state, loading: true, error: null };
    case PATCH__MANAGER__CONFIRM__VACCINE__SC:
      return { ...state, loading: false, vaccineConfirm: action.payload };
    case PATCH__MANAGER__CONFIRM__VACCINE__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default patchManagerConfirmVaccineReducer;
