export const actionTypes = {
  FAILURE: 'FAILURE',
  INCREMENT: 'INCREMENT',
  DECERMENT: 'DECERMENT',
  RESET: 'RESET',
  LOAD_DATA: 'LOAD_DATA',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS'
}

export function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error
  }
}

export function increment() {
  return {
    type: actionTypes.INCREMENT,
  }
}

export function decrement() {
  return {
    type: actionTypes.DECERMENT,
  }
}

export function reset() {
  return {
    type: actionTypes.RESET
  }
}

export function loadData() {
  return {
    type: actionTypes.LOAD_DATA
  }
}

export function loadDataSuccess() {
  return {
    type: actionTypes.LOAD_DATA_SUCCESS
  }
}