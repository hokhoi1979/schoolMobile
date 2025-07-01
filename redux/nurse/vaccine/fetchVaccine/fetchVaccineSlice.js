export const FETCH__VACCINE = "FETCH__VACCINE";
export const FETCH__VACCINE__SUCCESS = "FETCH__VACCINE__SUCCESS";
export const FETCH__VACCINE__FAIL = "FETCH__VACCINE__FAIL";

export const fetchVaccine = (data) => ({
  type: FETCH__VACCINE,
  payload: data,
});

export const fetchVaccineSuccess = (data) => ({
  type: FETCH__VACCINE__SUCCESS,
  payload: data,
});

export const fetchVaccineFail = (error) => ({
  type: FETCH__VACCINE__FAIL,
  payload: error,
});

const initialState = {
  vaccine: [],
  loading: false,
  error: null,
};

const vaccineReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__VACCINE:
      return { ...state, loading: true, error: null };
    case FETCH__VACCINE__SUCCESS:
      return { ...state, loading: false, vaccine: action.payload };
    case FETCH__VACCINE__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default vaccineReducer;
