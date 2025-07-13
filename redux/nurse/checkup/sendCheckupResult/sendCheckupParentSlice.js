export const SEND__CHECKUP__PARENT = "SEND__CHECKUP__PARENT";
export const SEND__CHECKUP__PARENT__SUCCESS = "SEND__CHECKUP__PARENT__SUCCESS";
export const SEND__CHECKUP__PARENT__FAIL = "SEND__CHECKUP__PARENT__FAIL";

export const sendCheckupParent = (data) => ({
  type: SEND__CHECKUP__PARENT,
  payload: data,
});

export const sendCheckupParentSuccess = (data) => ({
  type: SEND__CHECKUP__PARENT__SUCCESS,
  payload: data,
});

export const sendCheckupParentFail = (error) => ({
  type: SEND__CHECKUP__PARENT__FAIL,
  payload: error,
});

const initialState = {
  sendCheckup: [],
  loading: false,
  error: null,
};

const sendCheckupParentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND__CHECKUP__PARENT:
      return { ...state, loading: true, error: null };
    case SEND__CHECKUP__PARENT__SUCCESS:
      return { ...state, loading: false, sendCheckup: action.payload };
    case SEND__CHECKUP__PARENT__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default sendCheckupParentReducer;
