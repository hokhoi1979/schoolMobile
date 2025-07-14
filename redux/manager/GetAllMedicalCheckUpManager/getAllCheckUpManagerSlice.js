export const FETCH__CHECKUP__MANAGER = "FETCH__CHECKUP__MANAGER";
export const FETCH__CHECKUP__MANAGER__SC = "FETCH__CHECKUP__MANAGER__SC";
export const FETCH__CHECKUP__MANAGER__FL = "FETCH__CHECKUP__MANAGER__FL";

export const fetchCheckupManager = (data) => ({
  type: FETCH__CHECKUP__MANAGER,
  payload: data,
});

export const fetchCheckupManagerSuccess = (data) => ({
  type: FETCH__CHECKUP__MANAGER__SC,
  payload: data,
});

export const fetchCheckupManagerFail = (error) => ({
  type: FETCH__CHECKUP__MANAGER__FL,
  payload: error,
});

const initialState = {
  checkupManagerList: [],
  loading: false,
  error: null,
};

const getAllCheckupManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__CHECKUP__MANAGER:
      return { ...state, loading: true, error: null };
    case FETCH__CHECKUP__MANAGER__SC:
      return {
        ...state,
        loading: false,
        checkupManagerList: action.payload,
      };
    case FETCH__CHECKUP__MANAGER__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getAllCheckupManagerReducer;
