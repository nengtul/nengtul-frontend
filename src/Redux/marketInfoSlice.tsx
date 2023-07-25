import { createSlice, PayloadAction } from "@reduxjs/toolkit";

///-----
interface PlaceWithCoordinates extends Place {
    latitude: number;
    longitude: number;
  }
interface MarketInfoState {
    place: PlaceWithCoordinates | null;
}
const initialState: MarketInfoState = {
    place: null,
  };
const marketInfoSlice = createSlice({
    name: "marketInfo",
    initialState,
  
    reducers: {
      setPlace: (state, action: PayloadAction<PlaceWithCoordinates>) => {
        state.place = action.payload;
      },
    },
  });
  ///-----
interface Place {
    place_url: string;// "http://place.map.kakao.com/1216773935"
    place_name: string; //"세븐일레븐 무교본점"
    road_address_name?: string; //"서울 중구 무교로 13"
    address_name: string; //"서울 중구 무교동 24-2"
    category_group_name: string; //"편의점"
    x:string; //"126.97901437762353"
    y:string; //  "37.56714862610981"
    phone?:string;//"031-201-8000"

}

// interface MarketInfoState {
//     place: Place | null;
// }

// const initialState: MarketInfoState = {
//     place: null, 
// };

// const marketInfoSlice = createSlice({
//   name: "marketInfo",
//   initialState,

//   reducers: {
//     setPlace: (state, action: PayloadAction<Place>) => {
//       state.place = action.payload;
//     },
//   },
// });

export const { setPlace } = marketInfoSlice.actions;
export default marketInfoSlice.reducer;