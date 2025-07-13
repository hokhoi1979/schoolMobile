export const FETCH__TOTAL__STUDENT = "FETCH__TOTAL__STUDENT";
export const FETCH__TOTAL__STUDENT__SC = "FETCH__TOTAL__STUDENT__SC";
export const FETCH__TOTAL__STUDENT__FL = "FETCH__TOTAL__STUDENT__FL";

// Action Creators
export const fetchTotalStudent = (payload) => ({
  type: FETCH__TOTAL__STUDENT,
  payload,
});

export const fetchTotalStudentSuccess = (data) => ({
  type: FETCH__TOTAL__STUDENT__SC,
  payload: data,
});

export const fetchTotalStudentFail = (error) => ({
  type: FETCH__TOTAL__STUDENT__FL,
  payload: error,
});

// Initial State
const initialState = {
  totalStudents: [],
  loading: false,
  error: null,
};

// Reducer
const getTotalStudentSlice = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__TOTAL__STUDENT:
      return { ...state, loading: true, error: null };

    case FETCH__TOTAL__STUDENT__SC:
      console.log("🔥 Reducer nhận được total:", action.payload);
      return { ...state, loading: false, totalStudents: action.payload };
    case FETCH__TOTAL__STUDENT__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getTotalStudentSlice;
