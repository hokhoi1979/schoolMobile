export const FETCH_DECLINE_CHECK_UP = "FETCH_DECLINE_CHECK_UP";
export const FETCH_DECLINE_CHECK_UP_SUCCESS = "FETCH_DECLINE_CHECK_UP_SUCCESS";
export const FETCH_DECLINE_CHECK_UP_FAIL = "FETCH_DECLINE_CHECK_UP_FAIL";

export const fetchDeclineCheckUp = (data) => ({
  type: FETCH_DECLINE_CHECK_UP,
  payload: data,
});

export const fetchDeclineCheckUpSuccess = (data) => ({
  type: FETCH_DECLINE_CHECK_UP_SUCCESS,
  payload: data,
});

export const fetchDeclineCheckUpFail = (error) => ({
  type: FETCH_DECLINE_CHECK_UP_FAIL,
  payload: error,
});

const initialState = {
  student: [],
  loading: false,
  error: null,
};

const getCheckUpParentDeclineReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DECLINE_CHECK_UP:
      return { ...state, loading: true, error: null };
    case FETCH_DECLINE_CHECK_UP_SUCCESS:
      return { ...state, loading: false, student: action.payload };
    case FETCH_DECLINE_CHECK_UP_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default getCheckUpParentDeclineReducer;
