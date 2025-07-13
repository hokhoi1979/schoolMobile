export const FETCH_VACCINE_PARENT = "FETCH_VACCINE_PARENT";
export const FETCH_VACCINE_PARENT_SUCCESS = "FETCH_VACCINE_PARENT_SUCCESS";
export const FETCH_VACCINE_PARENT_FAIL = "FETCH_VACCINE_PARENT_FAIL";

export const fetchVaccineParent = (data) => ({
  type: FETCH_VACCINE_PARENT,
  payload: data,
});

export const fetchVaccineParentSuccess = (data) => ({
  type: FETCH_VACCINE_PARENT_SUCCESS,
  payload: data,
});

export const fetchVaccineParentFail = (error) => ({
  type: FETCH_VACCINE_PARENT_FAIL,
  payload: error,
});

const initialState = {
  vaccine: {},
  loading: false,
  error: null,
};

const vaccineParentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VACCINE_PARENT:
      return { ...state, loading: true, error: null };
    case FETCH_VACCINE_PARENT_SUCCESS:
      return { ...state, loading: false, vaccine: action.payload };
    case FETCH_VACCINE_PARENT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default vaccineParentReducer;
