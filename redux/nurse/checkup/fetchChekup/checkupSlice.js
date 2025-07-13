export const FETCH__CHECKUP="FETCH__CHECKUP";
export const FETCH__CHECKUP__SUCCESS="FETCH__CHECKUP__SUCCESS";
export const FETCH__CHECKUP__FAIL="FETCH__CHECKUP__FAIL";

export const fetchCheckup = (data) =>({
    type:FETCH__CHECKUP,
    payload:data
})

export const fetchCheckupSuccess = (data) =>({
    type:FETCH__CHECKUP__SUCCESS,
    payload:data
})

export const fetchCheckupFail = (error) =>({
    type:FETCH__CHECKUP__FAIL,
    payload:error
})

const initialState = {
    medical:[],
    loading:false,
    error:null,
}

const checkupReducer = (state = initialState, action) =>{
    switch(action.type){
        case FETCH__CHECKUP:
            return {...state, loading:true, error:null};
        case FETCH__CHECKUP__SUCCESS:
            return {...state, loading: false, medical:action.payload};
        case FETCH__CHECKUP__FAIL:
            return {...state, loading: false, error:action.payload};
        default:
            return state;
    }
}

export default checkupReducer;