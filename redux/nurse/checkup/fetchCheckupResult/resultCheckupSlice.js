export const FETCH__CHECKUP__RESULT = "FETCH__CHECKUP__RESULT";
export const FETCH__CHECKUP__RESULT__SUCCESS =
  "FETCH__CHECKUP__RESULT__SUCCESS";
export const FETCH__CHECKUP__RESULT__FAIL = "FETCH__CHECKUP__RESULT__FAIL";

export const fetchCheckupResult = (data) => ({
  type: FETCH__CHECKUP__RESULT,
  payload: data,
});

export const fetchCheckupResultSuccess = (data) => ({
  type: FETCH__CHECKUP__RESULT__SUCCESS,
  payload: data,
});

export const fetchCheckupResultFail = (error) => ({
  type: FETCH__CHECKUP__RESULT__FAIL,
  payload: error,
});

const initialState = {
  resultCheckup: [],
  loading: false,
  error: null,
};

const checkupResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__CHECKUP__RESULT:
      return { ...state, loading: true, error: null };
    case FETCH__CHECKUP__RESULT__SUCCESS:
      return { ...state, loading: false, resultCheckup: action.payload };
    case FETCH__CHECKUP__RESULT__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default checkupResultReducer;
