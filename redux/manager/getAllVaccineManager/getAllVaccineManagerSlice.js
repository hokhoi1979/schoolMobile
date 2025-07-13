// Action Types
export const FETCH__ALL__VACCINE__MANAGER = "FETCH__ALL__VACCINE__MANAGER";
export const FETCH__ALL__VACCINE__MANAGER__SC =
  "FETCH__ALL__VACCINE__MANAGER__SC";
export const FETCH__ALL__VACCINE__MANAGER__FL =
  "FETCH__ALL__VACCINE__MANAGER__FL";

// Action Creators
export const fetchVaccineManager = (data) => ({
  type: FETCH__ALL__VACCINE__MANAGER,
  payload: data,
});

export const fetchVaccineManagerSuccess = (data) => ({
  type: FETCH__ALL__VACCINE__MANAGER__SC,
  payload: data,
});

export const fetchVaccineManagerFail = (error) => ({
  type: FETCH__ALL__VACCINE__MANAGER__FL,
  payload: error,
});

// Initial State
const initialState = {
  vaccineManager: [],
  loading: false,
  error: null,
};

// Reducer
const vaccineManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__ALL__VACCINE__MANAGER:
      return { ...state, loading: true, error: null };
    case FETCH__ALL__VACCINE__MANAGER__SC:
      return { ...state, loading: false, vaccineManager: action.payload };
    case FETCH__ALL__VACCINE__MANAGER__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default vaccineManagerReducer;
