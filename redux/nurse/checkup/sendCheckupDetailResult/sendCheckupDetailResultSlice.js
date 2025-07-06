export const POST__CHECKUP__DETAIL_RESULT = "POST__CHECKUP__DETAIL_RESULT";
export const POST__CHECKUP__DETAIL_RESULT__SUCCESS =
  "POST__CHECKUP__DETAIL_RESULT__SUCCESS";
export const POST__CHECKUP__DETAIL_RESULT__FAIL =
  "POST__CHECKUP__DETAIL_RESULT__FAIL";

export const postCheckupDetailResult = (data) => ({
  type: POST__CHECKUP__DETAIL_RESULT,
  payload: data,
});

export const postCheckupDetailResultSuccess = (data) => ({
  type: POST__CHECKUP__DETAIL_RESULT__SUCCESS,
  payload: data,
});

export const postCheckupDetailResultFail = (error) => ({
  type: POST__CHECKUP__DETAIL_RESULT__FAIL,
  payload: error,
});

const initialState = {
  sendCheckupDetailResult: [],
  loading: false,
  error: null,
};

const postCheckupDetailResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST__CHECKUP__DETAIL_RESULT:
      return { ...state, loading: true, error: null };
    case POST__CHECKUP__DETAIL_RESULT__SUCCESS:
      return {
        ...state,
        loading: false,
        sendCheckupDetailResult: action.payload,
      };
    case POST__CHECKUP__DETAIL_RESULT__FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postCheckupDetailResultReducer;
