export const FETCH__STUDENT__CHECKUP = "FETCH__STUDENT__CHECKUP";
export const FETCH__STUDENT__CHECKUP__SUCCESS =
  "FETCH__STUDENT__CHECKUP__SUCCESS";
export const FETCH__STUDENT__CHECKUP__FAIL = "FETCH__STUDENT__CHECKUP__FAIL";

export const fetchStudentCheckup = (data) => ({
  type: FETCH__STUDENT__CHECKUP,
  payload: data,
});

export const fetchStudentCheckupSuccess = (data) => ({
  type: FETCH__STUDENT__CHECKUP__SUCCESS,
  payload: data,
});

export const fetchStudentCheckupFail = (error) => ({
  type: FETCH__STUDENT__CHECKUP__FAIL,
  payload: error,
});

const initialState = {
  listStudentCheckup: [],
  loading: false,
  error: null,
};

const studentCheckupReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__STUDENT__CHECKUP:
      return { ...state, loading: true, error: null };
    case FETCH__STUDENT__CHECKUP__SUCCESS:
      return { ...state, loading: false, listStudentCheckup: action.payload };
    case FETCH__STUDENT__CHECKUP__SUCCESS:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default studentCheckupReducer;
