export const POST__RESULT__VACCINE = "POST__RESULT__VACCINE";
export const POST__RESULT__VACCINE__SUCCESS = "POST__RESULT__VACCINE__SUCCESS";
export const POST__RESULT__VACCINE__FAIL = "POST__RESULT__VACCINE__FAIL";

export const postResultVaccine = (data) =>({
    type:POST__RESULT__VACCINE,
    payload:data
})

export const postResultVaccineSuccess = (data) =>({
    type:POST__RESULT__VACCINE__SUCCESS,
    payload:data
})

export const postResultVaccineFail = (error) =>({
    type:POST__RESULT__VACCINE__FAIL,
    payload:error
})

const initialState = {
    resultVaccine:[],
    loading:false,
    error:null,
}

const sendResultVaccineReducer = (state =initialState, action) =>{
    switch(action.type){
        case POST__RESULT__VACCINE:
            return{... state, loading:true, error:null};
        case POST__RESULT__VACCINE__SUCCESS:
            return{...state, loading:false, resultVaccine:action.payload};
        case POST__RESULT__VACCINE__FAIL:
            return{...state, loading:false, error:action.payload};
        default:
            return state;
    }
}

export default sendResultVaccineReducer;