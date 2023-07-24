import styled from "styled-components"

function MarketInfo(){

    return (
        <MarketInfoArea>
            <MarketImg  src="https://via.placeholder.com/140" alt="샘플이미지"></MarketImg>
            <InfoText>
                <MarketName>홈플러스 수원 영통점</MarketName>
                <MarketMeter>150m</MarketMeter>
                <MarketAddress>경기 수원시 영통구</MarketAddress>
                <MarketRunTime>영업시간: 9:00 ~ 23:00</MarketRunTime>
                <MarketTelArea><MarketTel href='tel:000-0000-0000'>전화하기</MarketTel></MarketTelArea>
            </InfoText>
        </MarketInfoArea>
    )
}


const MarketInfoArea = styled.div`
    width:inherit;
    height:25%;
    border-top: 1px solid #38DB83;
    border-radius: 20rem 20rem 0 0;
    display:flex;
    align-items: center;
    justify-content: center;
    margin-top:-10px;
    background-color:white;
    z-index:2;
`

const MarketImg=styled.img`
    width:140rem;
    height:140rem;
    border-radius:6rem;
    margin-right:12rem;
`

const InfoText=styled.div`
`

const MarketName=styled.div`
    font-size:18rem;
    font-weight:bold;
    margin-top:6rem;
    margin-bottom:6rem;
`
const MarketMeter=styled.div`
    font-size:15rem;
    font-weight:bold;
    margin-bottom:6rem;
`
const MarketAddress=styled.div`
    font-size:15rem;
    margin-bottom:6rem;
`
const MarketRunTime=styled.div`
    font-size:15rem;
    margin-bottom:10rem;
`
const MarketTelArea=styled.div`
    width:154rem;
    height:40rem;
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