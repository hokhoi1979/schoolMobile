export const FETCH__VACCINE__RESULT="FETCH__VACCINE__RESULT";
export const FETCH__VACCINE__RESULT__SUCCESS="FETCH__VACCINE__RESULT__SUCCESS";
export const FETCH__VACCINE__RESULT__FAIL="FETCH__VACCINE__RESULT__FAIL";

export const fetchVaccineResult =(data) =>({
    type:FETCH__VACCINE__RESULT,
    payload:data,
})

export const fetchVaccineResultSuccess =(data) =>({
    type:FETCH__VACCINE__RESULT__SUCCESS,
    payload:data,
})

export const fetchVaccineResultFail =(error) =>({
    type:FETCH__VACCINE__RESULT__FAIL,
    payload:error,
})

const initialState = {
    result:[],
    loading:false,
    error:null,
}

const vaccineResultReducer = (state = initialState, action)=>{
    switch(action.type){
        case FETCH__VACCINE__RESULT:
            return {...state, loading:true, error:null};
        case FETCH__VACCINE__RESULT__SUCCESS:
            return{...state, loading:false, result:action.payload};
        case FETCH__VACCINE__RESULT__FAIL:
            return{...state,loading:false, error:action.payload};
        default:
            return state;
    }
}

export default vaccineResultReducer;