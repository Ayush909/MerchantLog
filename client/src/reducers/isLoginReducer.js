
const initLogin = {
    isLogged : false
}
export default function isLoginReducer (state= {initLogin},action ){
    switch(action.type){
        case 'SET_IS_LOGIN':
            return {
                
                isLogged : action.payload
            }
        default:
            return state
    }
}