export const UPDATE__RESULT__VACCINE = "UPDATE__RESULT__VACCINE";
export const UPDATE__RESULT__VACCINE__SUCCESS =
  "UPDATE__RESULT__VACCINE__SUCCESS";
export const UPDATE__RESULT__VACCINE__FAIL = "UPDATE__RESULT__VACCINE__FAIL";

export const updateVaccineResult = (data) => ({
  type: UPDATE__RESULT__VACCINE,
  payload: data,
});

export const updateVaccineResultSuccess = (data) => ({
  type: UPDATE__RESULT__VACCINE__SUCCESS,
  payload: data,
});

export const updateVaccineResultFail = (error) => ({
  type: UPDATE__RESULT__VACCINE__FAIL,
  payload: error,
});

const initialState = {
  updateVaccine: [],
  loading: false,
  error: null,
};

const updateVaccineReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE__RESULT__VACCINE:
      return { ...state, loading: true, error: null };
    case UPDATE__RESULT__VACCINE__SUCCESS:
      return { ...state, loading: false, updateVaccine: action.payload };
    case UPDATE__RESULT__VACCINE__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default updateVaccineReducer;
