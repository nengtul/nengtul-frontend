import ContensWrap from "../common/ContentsWrap";
import Header from "../common/Header";
import MobileWrap from "../common/MobileWrap";
import TabMenu from "../common/TabMenu";
import TradePlaceMap from "./TradePlaceMap"
function TradePlacePage(){

    return(
        <MobileWrap>
            <Header />
            <ContensWrap>
                <TradePlaceMap/>
            </ContensWrap>
            <TabMenu />
        </MobileWrap>
    )
}
export default TradePlacePage