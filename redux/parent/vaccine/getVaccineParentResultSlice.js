export const FETCH_VACCINE_PARENT_RESULT = "FETCH_VACCINE_PARENT_RESULT";
export const FETCH_VACCINE_PARENT_RESULT_SUCCESS =
  "FETCH_VACCINE_PARENT_RESULT_SUCCESS";
export const FETCH_VACCINE_PARENT_RESULT_FAIL =
  "FETCH_VACCINE_PARENT_RESULT_FAIL";

export const fetchVaccineParentResult = (data) => ({
  type: FETCH_VACCINE_PARENT_RESULT,
  payload: data,
});
export const fetchVaccineParentResultSuccess = (data) => ({
  type: FETCH_VACCINE_PARENT_RESULT_SUCCESS,
  payload: data,
});

export const fetchVaccineParentResultFail = (error) => ({
  type: FETCH_VACCINE_PARENT_RESULT_FAIL,
  payload: error,
});

const initialState = {
  vaccine: [],
  loading: false,
  error: null,
};

const vaccineParentResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VACCINE_PARENT_RESULT:
      return { ...state, loading: true, error: null };
    case FETCH_VACCINE_PARENT_RESULT_SUCCESS:
      return { ...state, loading: false, vaccine: action.payload };
    case FETCH_VACCINE_PARENT_RESULT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default vaccineParentResultReducer;
