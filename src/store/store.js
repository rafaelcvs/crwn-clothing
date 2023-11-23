// Import necessary modules from Redux and related packages
import { compose, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux"; // Importing the createStore function with an alias
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import { rootReducer } from "./root-reducer"; // Importing the root reducer from a separate file

// Configuration for Redux persist
const persistConfig = {
    key: 'root',          // Key used to store data in storage
    storage,              // Storage engine for persisting data (imported from redux-persist)
    whitelist: ['cart']   // List of reducer keys to be excluded from persisting
}

// Creating a persisted reducer using the configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Middleware for development environment (logger)
const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean);

// Compose enhancers, including support for Redux DevTools extension
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || // Use the Redux DevTools extension compose if available
  compose; // Otherwise, use the default compose function from Redux

// Combining enhancers with middleware
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// Creating the Redux store with the persisted reducer and enhancers
export const store = createStore(persistedReducer, undefined, composedEnhancers);

// Creating a persistor for the store
export const persistor = persistStore(store);
