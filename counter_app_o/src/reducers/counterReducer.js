
// 初期状態
const initialState =  {
    count: 0,
    button: 0,
}

const counterReducer = function(state = initialState, action) {
    switch(action.type) {
        case "ADD_COUNTER":
            return Object.assign({}, state, {
                count: state.count + action.payload
            })
            break;
        case "RESET_COUNTER":
            return Object.assign({}, state, {
                count: 0
            })
            break;
        case 'SET_BUTTON':
            return Object.assign({}, state, {
                button: action.payload,
            })
            break;
        default:
            return state;
    }
}

export default counterReducer;