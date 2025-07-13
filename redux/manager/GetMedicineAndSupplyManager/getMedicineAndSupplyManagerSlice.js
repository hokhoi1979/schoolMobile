export const FETCH__MEDICINE__SUPPLY__MANAGER =
  "FETCH__MEDICINE__SUPPLY__MANAGER";
export const FETCH__MEDICINE__SUPPLY__MANAGER__SC =
  "FETCH__MEDICINE__SUPPLY__MANAGER__SC";
export const FETCH__MEDICINE__SUPPLY__MANAGER__FL =
  "FETCH__MEDICINE__SUPPLY__MANAGER__FL";

export const fetchMedicineSupplyManager = (data) => ({
  type: FETCH__MEDICINE__SUPPLY__MANAGER,
  payload: data,
});

export const fetchMedicineSupplyManagerSucess = (data) => ({
  type: FETCH__MEDICINE__SUPPLY__MANAGER__SC,
  payload: data,
});

export const fetchMedicineSupplyManagerFail = (error) => ({
  type: FETCH__MEDICINE__SUPPLY__MANAGER__FL,
  payload: error,
});

const initialState = {
  medicineSupply: [],
  loading: false,
  error: null,
};

const getMedicineSupplyManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__MEDICINE__SUPPLY__MANAGER:
      return { ...state, loading: true, error: null };
    case FETCH__MEDICINE__SUPPLY__MANAGER__SC:
      return { ...state, loading: false, medicineSupply: action.payload };
    case FETCH__MEDICINE__SUPPLY__MANAGER__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getMedicineSupplyManagerReducer;
