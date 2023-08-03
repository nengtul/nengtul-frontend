import styled from 'styled-components';
import {useEffect,useRef} from 'react';
interface TradeDynamicMapProps {
    latitude: number;
    longitude: number;
}
const TradeDynamicMap=({latitude,longitude}:TradeDynamicMapProps)=>{
    const kakaoMapRef=useRef<HTMLDivElement>(null)
    return (
        <DynamicMapOne>
            <DynamicMapTwo ref={kakaoMapRef}/>
        </DynamicMapOne>
    )
}

const DynamicMapOne = styled.div`
    height:100%;
`
const DynamicMapTwo = styled.div`
    width:100%;
    height:100%;
`
export default TradeDynamicMap