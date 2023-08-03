import { createSlice,PayloadAction } from "@reduxjs/toolkit";
interface LatLngState {
    moveLatitude: number;
    moveLongitude: number;
}
  
const initialState: LatLngState = {
    moveLatitude: 0,
    moveLongitude: 0,
};

const LatLngSlice=createSlice({
    name:"latlngInfo",
    initialState,
    reducers:{
        setLatLng: (state, action: PayloadAction<{ moveLatitude: number; moveLongitude: number }>) => {
            // state.moveLatitude = action.payload.moveLatitude;
            // state.moveLongitude = action.payload.moveLongitude;
            const { moveLatitude, moveLongitude } = action.payload;
            state.moveLatitude = moveLatitude;
            state.moveLongitude= moveLongitude;
    },
    }
})

export const { setLatLng } = LatLngSlice.actions;
export default LatLngSlice.reducer;