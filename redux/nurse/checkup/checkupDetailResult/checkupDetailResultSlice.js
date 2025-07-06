export const CHECKUP__DETAIL__RESULT = "CHECKUP__DETAIL__RESULT";
export const CHECKUP__DETAIL__RESULT__SUCCESS =
  "CHECKUP__DETAIL__RESULT__SUCCESS";
export const CHECKUP__DETAIL__RESULT__FAIL = "CHECKUP__DETAIL__RESULT__FAIL";

export const fetchCheckupDetailResult = (data) => ({
  type: CHECKUP__DETAIL__RESULT,
  payload: data,
});

export const fetchCheckupDetailResultSuccess = (data) => ({
  type: CHECKUP__DETAIL__RESULT__SUCCESS,
  payload: data,
});

export const fetchCheckupDetailResultFail = (error) => ({
  type: CHECKUP__DETAIL__RESULT__FAIL,
  payload: error,
});

const initialState = {
  checkDetail: [],
  loading: false,
  error: null,
};

const fetchCheckupDetailResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECKUP__DETAIL__RESULT:
      return { ...state, loading: true, error: null };
    case CHECKUP__DETAIL__RESULT__SUCCESS:
      return { ...state, loading: false, checkDetail: action.payload };
    case CHECKUP__DETAIL__RESULT__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default fetchCheckupDetailResultReducer;
