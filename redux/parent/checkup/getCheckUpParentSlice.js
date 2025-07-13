export const FETCH_CHECK_UP_PARENT = "FETCH_CHECK_UP_PARENT";
export const FETCH_CHECK_UP_PARENT_SUCCESS = "FETCH_CHECK_UP_PARENT_SUCCESS";
export const FETCH_CHECK_UP_PARENT_FAIL = "FETCH_CHECK_UP_PARENT_FAIL";

export const fetchCheckUpParent = (data) => ({
  type: FETCH_CHECK_UP_PARENT,
  payload: data,
});

export const fetchCheckUpParentSuccess = (data) => ({
  type: FETCH_CHECK_UP_PARENT_SUCCESS,
  payload: data,
});

export const fetchCheckUpParentFail = (error) => ({
  type: FETCH_CHECK_UP_PARENT_FAIL,
  payload: error,
});

const initialState = {
  checkup: [],
  loading: false,
  error: null,
};

const checkupParentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHECK_UP_PARENT:
      return { ...state, loading: true, error: null };
    case FETCH_CHECK_UP_PARENT_SUCCESS:
      return { ...state, loading: false, checkup: action.payload };
    case FETCH_CHECK_UP_PARENT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default checkupParentReducer;
