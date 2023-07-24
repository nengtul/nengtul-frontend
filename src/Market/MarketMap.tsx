import styled from "styled-components"
import Map from './Map'
import DynamicMap from './DynamicMap'
import { useState,useEffect } from "react";
function MarketMap(){
    const [isChecked, setIsChecked] = useState(false);

    const [latitude, setLatitude] = useState(37.5667);
    const [longitude, setLongitude] = useState(126.9783);
    const handleCheckboxChange = () => {
        setIsChecked((prevChecked) => !prevChecked);
    };
    useEffect(() => {
        if(isChecked){
            console.log('동의함')
            if (navigator.geolocation) {

                // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                navigator.geolocation.getCurrentPosition(function(position) {
        
                    const lat = position.coords.latitude, // 위도
                        lon = position.coords.longitude; // 경도
        
                   console.log('내위치',lat,lon)
                   setLatitude(lat);
                    setLongitude(lon);
                });
            }
        }
        else{
            console.log('동의 안함')
            const latStandard= 37.5667;
            const lonStandard = 126.9783;
            setLatitude(latStandard);
            setLongitude(lonStandard );
            console.log('서울 특별시 기준',latStandard,lonStandard)
        }
    }, [isChecked]);


    return (
        <MarketMapArea>
            <Map>
                <DynamicMap latitude={latitude} longitude={longitude}/>
            </Map>
            <LocationAccept>
                위치정보제공 동의
                <>
                <input type="checkbox" id="checkbox" checked={isChecked} onChange={handleCheckboxChange}></input>
                </>
            </LocationAccept>
        </MarketMapArea>
    )
}

const MarketMapArea=styled.div`
    flex:1;
    position:relative;
`
const LocationAccept = styled.div`
    position:absolute;
    border-radius:5rem;
    padding: 4rem;
    width:auto;
    background-color:#38DB83;
    font-size:15rem;
    font-weight:bold;
    z-index:100;
    display:flex;
    align-items: center;
    color:white;
    bottom:20rem;
    right:20rem;
`
export default MarketMap