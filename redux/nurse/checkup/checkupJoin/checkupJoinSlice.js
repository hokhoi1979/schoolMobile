export const FETCH__CHECKUP__JOIN = "FETCH__CHECKUP__JOIN";
export const FETCH__CHECKUP__JOIN__SUCCESS = "FETCH__CHECKUP__JOIN__SUCCESS";
export const FETCH__CHECKUP__JOIN__FAIL = "FETCH__CHECKUP__JOIN__FAIL";

export const fetchCheckupJoin = (data) => ({
  type: FETCH__CHECKUP__JOIN,
  payload: data,
});

export const fetchCheckupJoinSuccess = (data) => ({
  type: FETCH__CHECKUP__JOIN__SUCCESS,
  payload: data,
});

export const fetchCheckupJoinFail = (error) => ({
  type: FETCH__CHECKUP__JOIN__FAIL,
  payload: error,
});

const intitialState = {
  studentJoin: [],
  loading: false,
  error: null,
};

const checkupJoinReducer = (state = intitialState, action) => {
  switch (action.type) {
    case FETCH__CHECKUP__JOIN:
      return { ...state, loading: true, error: null };
    case FETCH__CHECKUP__JOIN__SUCCESS:
      return { ...state, loading: false, studentJoin: action.payload };
    case FETCH__CHECKUP__JOIN__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default checkupJoinReducer;
