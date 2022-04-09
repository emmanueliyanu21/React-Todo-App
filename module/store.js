import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from './reducers'
// import ReduxThunk from 'redux-thunk'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger()

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware( thunkMiddleware,
  loggerMiddleware
    ))
    const persistor = persistStore(store)
    export default store
    export {persistor}


// import { createStore, applyMiddleware } from 'redux'
// import rootReducer from './reducers'
// // import { composeWithDevTools} from 'redux-dreevtools-extension'
// import thunkMiddleware from 'redux-thunk'
// import { createLogger } from 'redux-logger'

// const loggerMiddleware = createLogger()

// const store = createStore(
//   rootReducer,
//   applyMiddleware(
//     thunkMiddleware,
//     loggerMiddleware
//   ))

// export default store