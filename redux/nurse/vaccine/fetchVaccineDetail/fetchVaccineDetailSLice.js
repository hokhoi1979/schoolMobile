export const FETCH__VACCINE__STUDENT = "FETCH__VACCINE__STUDENT";
export const FETCH__VACCINE__STUDENT__SUCCESS =
  "FETCH__VACCINE__STUDENT__SUCCESS";
export const FETCH__VACCINE__STUDENT__FAIL = "FETCH__VACCINE__STUDENT__FAIL";

export const fetchVaccineStudent = (data) => ({
  type: FETCH__VACCINE__STUDENT,
  payload: data,
});

export const fetchVaccineStudentSucess = (data) => ({
  type: FETCH__VACCINE__STUDENT__SUCCESS,
  payload: data,
});

export const fetchVaccineStudentFail = (error) => ({
  type: FETCH__VACCINE__STUDENT__FAIL,
  payload: error,
});

const initialState = {
  student: [],
  loading: false,
  error: null,
};

const vaccineStudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__VACCINE__STUDENT:
      return { ...state, loading: true, error: null };
    case FETCH__VACCINE__STUDENT__SUCCESS:
      return { ...state, loading: false, student: action.payload };
    case FETCH__VACCINE__STUDENT__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default vaccineStudentReducer;
