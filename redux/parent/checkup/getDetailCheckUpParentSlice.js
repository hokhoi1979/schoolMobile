export const FETCH_DETAIL_CHECK_UP_PARENT = "FETCH_DETAIL_CHECK_UP_PARENT";
export const FETCH_DETAIL_CHECK_UP_PARENT_SUCCESS =
  "FETCH_DETAIL_CHECK_UP_PARENT_SUCCESS";
export const FETCH_DETAIL_CHECK_UP_PARENT_FAIL =
  "FETCH_DETAIL_CHECK_UP_PARENT_FAIL";

export const fetchDetailCheckUpParent = (data) => ({
  type: FETCH_DETAIL_CHECK_UP_PARENT,
  payload: data,
});

export const fetchDetailCheckUpParentSuccess = (data) => ({
  type: FETCH_DETAIL_CHECK_UP_PARENT_SUCCESS,
  payload: data,
});

export const fetchDetailCheckUpParentFail = (error) => ({
  type: FETCH_DETAIL_CHECK_UP_PARENT_FAIL,
  payload: error,
});

const initialState = {
  checkup: [],
  loading: false,
  error: null,
};

const detailCheckUpParentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DETAIL_CHECK_UP_PARENT:
      return { ...state, loading: true, error: null };
    case FETCH_DETAIL_CHECK_UP_PARENT_SUCCESS:
      return { ...state, loading: false, checkup: action.payload };
    case FETCH_DETAIL_CHECK_UP_PARENT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default detailCheckUpParentReducer;
