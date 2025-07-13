export const POST__MANAGER__CHECKUP = "POST__MANAGER__CHECKUP";
export const POST__MANAGER__CHECKUP__SC = "POST__MANAGER__CHECKUP__SC";
export const POST__MANAGER__CHECKUP__FL = "POST__MANAGER__CHECKUP__FL";

export const postManagerCheckup = (data) => ({
  type: POST__MANAGER__CHECKUP,
  payload: data,
});

export const postManagerSuccessCheckup = (data) => ({
  type: POST__MANAGER__CHECKUP__SC,
  payload: data,
});

export const postManagerFailCheckup = (error) => ({
  type: POST__MANAGER__CHECKUP__FL,
  payload: error,
});

const initialState = {
  checkups: [],
  loading: false,
  error: null,
};

const managerCheckupReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST__MANAGER__CHECKUP:
      return { ...state, loading: true, error: null };
    case POST__MANAGER__CHECKUP__SC:
      return { ...state, loading: false, checkups: action.payload };
    case POST__MANAGER__CHECKUP__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default managerCheckupReducer;
