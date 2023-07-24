import styled from "styled-components";

import MobileWrap from '../common/MobileWrap'
import Header from '../common/Header'
import Banner from './Banner'
// import MarketInfo from './MarketInfo'
// import MarketMap from "./MarketMap";
function MarketPage(){
    return (
        <MobileWrap>
            <MarketPageArea>
                <Header/>
                <Banner/>
                {/* <MarketMap/> */}
                {/* <MarketInfo/> */}
            </MarketPageArea>
        </MobileWrap>
    )

}

const MarketPageArea=styled.div`
display:flex;
height:100%;
width:inherit;
flex-direction: column;
`
export default MarketPage