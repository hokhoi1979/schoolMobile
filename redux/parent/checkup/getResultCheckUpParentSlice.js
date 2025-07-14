export const FETCH_RESULT_CHECK_UP_PARENT = "FETCH_RESULT_CHECK_UP_PARENT";
export const FETCH_RESULT_CHECK_UP_PARENT_SUCCESS =
  "FETCH_RESULT_CHECK_UP_PARENT_SUCCESS";
export const FETCH_RESULT_CHECK_UP_PARENT_FAIL =
  "FETCH_RESULT_CHECK_UP_PARENT_FAIL";

export const fetchResultCheckUpParent = (data) => ({
  type: FETCH_RESULT_CHECK_UP_PARENT,
  payload: data,
});

export const fetchResultCheckUpParentSuccess = (data) => ({
  type: FETCH_RESULT_CHECK_UP_PARENT_SUCCESS,
  payload: data,
});

export const fetchResultCheckUpParentFail = (error) => ({
  type: FETCH_RESULT_CHECK_UP_PARENT_FAIL,
  payload: error,
});

const initialState = {
  checkup: [],
  loading: false,
  error: null,
};

const resultCheckUpParentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESULT_CHECK_UP_PARENT:
      return { ...state, loading: true, error: null };
    case FETCH_RESULT_CHECK_UP_PARENT_SUCCESS:
      return { ...state, loading: false, checkup: action.payload };
    case FETCH_RESULT_CHECK_UP_PARENT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default resultCheckUpParentReducer;
