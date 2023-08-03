import Map from "../Market/Map";
import TradeDynamicMap from "./TradeDynamicMap";
import { useState, useEffect } from "react";
import styled from "styled-components";
function TradePlaceMap(){
    const [latitude, setLatitude] = useState(37.5667);
    const [longitude, setLongitude] = useState(126.9783);
    // useEffect(()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setLatitude(lat);
            setLongitude(lon);
            })
    }
    // },[])
    console.log(latitude,longitude)
    return(
        <MarketMapArea>
            <Map>
            <TradeDynamicMap latitude={latitude} longitude={longitude} />
            </Map>
       
      </MarketMapArea>
    )
}
export default TradePlaceMap

const MarketMapArea = styled.div`
  flex: 1;
  position: relative;
`;