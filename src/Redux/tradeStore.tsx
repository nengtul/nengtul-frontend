import { configureStore } from "@reduxjs/toolkit";
import LatLngReducer from "./LatLngSlice";
const tradeStore=configureStore({
    reducer:{
        latlngInfo:LatLngReducer,
    }
})
export type RootState = ReturnType<typeof tradeStore.getState>;
export default tradeStore;