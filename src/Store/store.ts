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

const accessTokenPersistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedAcceessTokenReducer = persistReducer(accessTokenPersistConfig, accessTokenReducer);

export const store = configureStore({
  reducer: {
    accessTokenValue: persistedAcceessTokenReducer,
  },
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
