export const FETCH_ACCEPT_VACCINE = "FETCH_ACCEPT_VACCINE";
export const FETCH_ACCEPT_VACCINE_SUCCESS = "FETCH_ACCEPT_VACCINE_SUCCESS";
export const FETCH_ACCEPT_VACCINE_FAIL = "FETCH_ACCEPT_VACCINE_FAIL";

export const fetchAcceptVaccine = (data) => ({
  type: FETCH_ACCEPT_VACCINE,
  payload: data,
});

export const fetchAcceptVaccineSuccess = (data) => ({
  type: FETCH_ACCEPT_VACCINE_SUCCESS,
  payload: data,
});

export const fetchAcceptVaccineFail = (data) => ({
  type: FETCH_ACCEPT_VACCINE_FAIL,
  payload: data,
});

const initialState = {
  student: [],
  loading: false,
  error: null,
};

const getVaccineParentAcceptReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCEPT_VACCINE:
      return { ...state, loading: true, error: null };
    case FETCH_ACCEPT_VACCINE_SUCCESS:
      return { ...state, loading: false, student: action.payload };
    case FETCH_ACCEPT_VACCINE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default getVaccineParentAcceptReducer;
