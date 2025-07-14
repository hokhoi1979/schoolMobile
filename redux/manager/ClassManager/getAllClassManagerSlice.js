export const FETCH__CLASS__MANAGER = "FETCH__CLASS__MANAGER";
export const FETCH__CLASS__MANAGER__SC = "FETCH__CLASS__MANAGER__SC";
export const FETCH__CLASS__MANAGER__FL = "FETCH__CLASS__MANAGER__FL";

export const fetchClassManager = (data) => ({
  type: FETCH__CLASS__MANAGER,
  payload: data,
});

export const fetchClassManagerSucess = (data) => ({
  type: FETCH__CLASS__MANAGER__SC,
  payload: data,
});

export const fetchClassManagerFail = (error) => ({
  type: FETCH__CLASS__MANAGER__FL,
  payload: error,
});

const initialState = {
  classManager: [],
  loading: false,
  error: null,
};

const getClassManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__CLASS__MANAGER:
      return { ...state, loading: true, error: null };
    case FETCH__CLASS__MANAGER__SC:
      return { ...state, loading: false, classManager: action.payload };
    case FETCH__CLASS__MANAGER__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getClassManagerReducer;
