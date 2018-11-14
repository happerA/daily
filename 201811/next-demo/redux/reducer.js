import {actionTypes} from './actions'

export const exampleInitialState = { count: 0, userData: [] }

function reducer(state=exampleInitialState, action) {
  switch(action.type) {
    case actionTypes.FAILURE: return {...state, ...{error: action.error}}
    case actionTypes.INCREMENT: return {...state, ...{count: state.count+1}}
    case actionTypes.DECERMENT: return {...state, ...{count: state.count-1}}
    case actionTypes.RESET: return {...state, ...{count: exampleInitialState.count}}
    case actionTypes.LOAD_DATA_SUCCESS: return {...state, ...{userData: action.userData}}
    default: return state
  }
}

export default reducer