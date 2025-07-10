export const FETCH_ACCEPT_CHECK_UP = "FETCH_ACCEPT_CHECK_UP";
export const FETCH_ACCEPT_CHECK_UP_SUCCESS = "FETCH_ACCEPT_CHECK_UP_SUCCESS";
export const FETCH_ACCEPT_CHECK_UP_FAIL = "FETCH_ACCEPT_CHECK_UP_FAIL";

export const fetchAcceptCheckUp = (data) => ({
  type: FETCH_ACCEPT_CHECK_UP,
  payload: data,
});

export const fetchAcceptCheckUpSuccess = (data) => ({
  type: FETCH_ACCEPT_CHECK_UP_SUCCESS,
  payload: data,
});

export const fetchAcceptCheckUpFail = (error) => ({
  type: FETCH_ACCEPT_CHECK_UP_FAIL,
  payload: error,
});

const initialState = {
  student: [],
  loading: false,
  error: null,
};

const getCheckUpParentAcceptReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCEPT_CHECK_UP:
      return { ...state, loading: true, error: null };
    case FETCH_ACCEPT_CHECK_UP_SUCCESS:
      return { ...state, loading: false, student: action.payload };
    case FETCH_ACCEPT_CHECK_UP_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default getCheckUpParentAcceptReducer;
