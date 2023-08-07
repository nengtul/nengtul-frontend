import Map from "../Market/Map";
// import Map from "./Map";
import TradeDynamicMap from "./TradeDynamicMap";
import { useState } from "react";
import styled from "styled-components";
type TradePlaceMapProps = {
  onClose: () => void; 
};
function TradePlaceMap( {onClose} : TradePlaceMapProps){
    const [latitude, setLatitude] = useState(37.5667);
    const [longitude, setLongitude] = useState(126.9783);
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setLatitude(lat);
            setLongitude(lon);
            })
    }
    console.log(latitude,longitude)
    return(
        <MarketMapArea>
            <Map>
            <TradeDynamicMap latitude={latitude} longitude={longitude} onClose={onClose} />
            </Map>
      </MarketMapArea>
    )
}
export default TradePlaceMap

const MarketMapArea = styled.div`
  flex: 1;
  position: relative;
`;