// Actions
export const PATCH__MANAGER__END__MEDICAL__CHECKUP =
  "PATCH__MANAGER__END__MEDICAL__CHECKUP";
export const PATCH__MANAGER__END__MEDICAL__CHECKUP__SC =
  "PATCH__MANAGER__END__MEDICAL__CHECKUP__SC";
export const PATCH__MANAGER__END__MEDICAL__CHECKUP__FL =
  "PATCH__MANAGER__END__MEDICAL__CHECKUP__FL";

// Action Creators
export const patchManagerEndMedicalCheckup = (data) => ({
  type: PATCH__MANAGER__END__MEDICAL__CHECKUP,
  payload: data,
});

export const patchManagerSuccessEndMedicalCheckup = (data) => ({
  type: PATCH__MANAGER__END__MEDICAL__CHECKUP__SC,
  payload: data,
});

export const patchManagerFailEndMedicalCheckup = (error) => ({
  type: PATCH__MANAGER__END__MEDICAL__CHECKUP__FL,
  payload: error,
});

// Reducer
const initialState = {
  medicalCheckupResult: [],
  loading: false,
  error: null,
};

const endEventMedicalCheckUpManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PATCH__MANAGER__END__MEDICAL__CHECKUP:
      return { ...state, loading: true, error: null };
    case PATCH__MANAGER__END__MEDICAL__CHECKUP__SC:
      return { ...state, loading: false, medicalCheckupResult: action.payload };
    case PATCH__MANAGER__END__MEDICAL__CHECKUP__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default endEventMedicalCheckUpManagerReducer;
