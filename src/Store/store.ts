import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import accessTokenReducer from "./reducers";

//이거 합쳐보려고 추가한거 
import { combineReducers } from 'redux';
import LatLngReducer from '../Redux/LatLngSlice'
//-----

const accessTokenPersistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedAcceessTokenReducer = persistReducer(accessTokenPersistConfig, accessTokenReducer);

//이거 합쳐보려고 추가한거 
const rootReducer = combineReducers({
  accessTokenValue: persistedAcceessTokenReducer,
  latlngInfo: LatLngReducer,
});
//--------

export const store = configureStore({
  reducer: rootReducer,
  //원래진완님꺼
  // reducer: {
  //   accessTokenValue: persistedAcceessTokenReducer,
  // },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
