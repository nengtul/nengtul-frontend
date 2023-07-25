// import { legacy_createStore as createStore, Reducer, Action } from "redux";
// import rootReducer,{ RootState }  from "./rootReducer";

// const store: Reducer<RootState, Action<any>> = createStore(rootReducer);

// export default store;
import { configureStore } from "@reduxjs/toolkit";
import marketInfoReducer from './marketInfoSlice'
const store = configureStore({
  reducer: {
    marketInfo:marketInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;