import { createStore, applyMiddleware } from 'redux'
import createSageMiddleware from 'redux-saga'
import rootReducer, { exampleInitialState } from './reducer'
import rootSaga from './saga'

const sagaMiddleware  = createSageMiddleware()
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const {composeWitDevTools} = require('redux-devtools-extension')

    const { logger } = require('redux-logger')
    middleware.push(logger)
    return composeWitDevTools(applyMiddleware(...middleware))
  }
}

function configureStore (initailState = exampleInitialState) {
  const store = createStore(
    rootReducer,
    initailState,
    bindMiddleware([sagaMiddleware])
  )
  store.runSageTask = () => (
    store.sagaTask = sagaMiddleware.run(rootSaga)
  )
  store.runSageTask()
  return store
}

export default configureStore