import styled from "styled-components";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../Redux/store";
function MarketInfo(){
    const place = useSelector((state: RootState) => state.marketInfo.place);
    console.log('이게 떴으면 좋겠다!!',place)
    let distance = 0;
   
    if (place) {
        // place가 존재할 때만 거리를 계산하고 distance 변수에 값을 할당합니다.
        distance = getDistanceFromLatLonInKm(place.latitude, place.longitude, Number(place.y), Number(place.x));
    } else {
        return <></>; // place가 없을 때는 로딩 메시지를 렌더링합니다.
    }
    return (
        <MarketInfoArea>
            {/* <MarketImg  src="https://via.placeholder.com/140" alt="샘플이미지"></MarketImg> */}
            <InfoText>
            {place.category_group_name&&<MarketCategory>{place.category_group_name}</MarketCategory>}
                {place.place_name &&<MarketName>{place.place_name}</MarketName>}
                <MarketMeter> {`${Math.ceil(distance)}`}m</MarketMeter>
                {place.address_name&&<MarketAddress>{place.address_name}</MarketAddress>}
                {/* <MarketRunTime>영업시간: 9:00 ~ 23:00</MarketRunTime> */}
                {place.phone &&<MarketTelArea><MarketTel href={`tel:${place.phone}`}>전화하기</MarketTel></MarketTelArea>}
            </InfoText>
        </MarketInfoArea>
    )
}
function degreesToRadians(degrees:number) {
    return degrees * (Math.PI / 180);
  }
  
  function getDistanceFromLatLonInKm(lat1:number, lon1:number, lat2:number, lon2:number) {
    const earthRadius = 6371e3; // 지구의 반지름 (단위: km)
  
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
  
    return distance; // 두 지점 사이의 거리 (단위: km)

  
  }

const MarketInfoArea = styled.div`
    width:inherit;
    // height:20%;
    height:auto;
    padding-bottom:15rem;
    border-top: 1px solid #38DB83;
    border-radius: 20rem 20rem 0 0;
    // display:flex;
    // align-items: center;
    // justify-content: center;
    margin-top:-10px;
    background-color:white;
    z-index:2;
`

// const MarketImg=styled.img`
//     width:140rem;
//     height:140rem;
//     border-radius:6rem;
//     margin-right:12rem;
// `

const InfoText=styled.div`
    margin-left:50rem;
    margin-top:20rem;
    
`

const MarketName=styled.div`
    font-size:18rem;
    font-weight:bold;
    margin-top:12rem;
    margin-bottom:6rem;
`
const MarketMeter=styled.div`
    font-size:15rem;
    font-weight:bold;
    margin-bottom:6rem;
`
const MarketAddress=styled.div`
    font-size:15rem;
    margin-bottom:10rem;
`
const MarketCategory=styled.span`
    font-size:15rem;
    padding:3rem 5rem;
    color:#d64242;
    width:auto;
    border-radius:9rem;
    border:1px solid #d64242;
    `
// const MarketRunTime=styled.div`
//     font-size:15rem;
//     margin-bottom:10rem;
// `
const MarketTelArea=styled.div`
    width:80%;
    height:38rem;
    background-color:#38DB83;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius:6rem;
`
const MarketTel=styled.a`
    font-size:16rem;
    font-weight:bold;
    color:white;
`

export default MarketInfo