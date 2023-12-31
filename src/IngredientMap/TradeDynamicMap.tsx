import styled from 'styled-components';
import {useEffect,useRef,useState} from 'react';
import { useDispatch } from 'react-redux';
import {setLatLng} from '../Redux/LatLngSlice';
interface TradeDynamicMapProps {
    latitude: number;
    longitude: number;
    onClose: () => void;
}

const TradeDynamicMap=({latitude,longitude, onClose}:TradeDynamicMapProps)=>{
    const dispatch=useDispatch();
    const [moveLatitude, setMoveLatitude] = useState(latitude);
    const [moveLongitude, setMoveLongitude] = useState(longitude);

    const kakaoMapRef=useRef<HTMLDivElement>(null)
    useEffect(()=>{
        if (!kakaoMapRef.current){
            return 
        }
        const targetPoint=new kakao.maps.LatLng(latitude,longitude) //현재위치
        const options={
            center:targetPoint,
            level:3
        }
        const map =new kakao.maps.Map(kakaoMapRef.current,options) //지도 생성

        const marker = new kakao.maps.Marker({position:map.getCenter()})
        marker.setMap(map)
        interface CustomMouseEvent {
            latLng: kakao.maps.LatLng;
          }
        kakao.maps.event.addListener(map, 'click', function(mouseEvent: CustomMouseEvent) {        
    
            // 클릭한 위도, 경도 정보를 가져옵니다 
            const latlng = mouseEvent.latLng; 
            
            // 마커 위치를 클릭한 위치로 옮깁니다
            marker.setPosition(latlng);
            const message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, '+'경도는 ' + latlng.getLng() + ' 입니다';
            setMoveLatitude(latlng.getLat());
            setMoveLongitude(latlng.getLng());
            console.log(message)
        });
    },[])
    console.log(moveLatitude,moveLongitude)
   const goBack=()=>{
        dispatch(setLatLng({moveLatitude,moveLongitude}))
        onClose();
   }
    return (
        <DynamicMapOne>
            <DynamicMapTwo ref={kakaoMapRef}/>
                <GoBack onClick={goBack}>장소설정하기</GoBack>
        </DynamicMapOne>
        
    )
}

const DynamicMapOne = styled.div`
    height:550rem;
    flex:1;
`
const DynamicMapTwo = styled.div`
    height:100%;
    width:100%;
`
const GoBack=styled.button`
    width:100%;
    height:60rem;
    background-color:#38DB83;
    cursor:pointer;
    font-size:21rem;
    color:white;
`
export default TradeDynamicMap