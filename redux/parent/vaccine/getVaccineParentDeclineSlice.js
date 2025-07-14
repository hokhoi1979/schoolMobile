export const FETCH_DECLINE_VACCINE = "FETCH_DECLINE_VACCINE";
export const FETCH_DECLINE_VACCINE_SUCCESS = "FETCH_DECLINE_VACCINE_SUCCESS";
export const FETCH_DECLINE_VACCINE_FAIL = "FETCH_DECLINE_VACCINE_FAIL";

export const fetchDeclineVaccine = (data) => ({
  type: FETCH_DECLINE_VACCINE,
  payload: data,
});

export const fetchDeclineVaccineSuccess = (data) => ({
  type: FETCH_DECLINE_VACCINE_SUCCESS,
  payload: data,
});

export const fetchDeclineVaccineFail = (data) => ({
  type: FETCH_DECLINE_VACCINE_FAIL,
  payload: data,
});

const initialState = {
  student: [],
  loading: false,
  error: null,
};

const getVaccineParentDeclineReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DECLINE_VACCINE:
      return { ...state, loading: true, error: null };
    case FETCH_DECLINE_VACCINE_SUCCESS:
      return { ...state, loading: false, student: action.payload };
    case FETCH_DECLINE_VACCINE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default getVaccineParentDeclineReducer;
