import MobileWrap from "../common/MobileWrap";
import Header from "../common/Header";
import ContensWrap from "../common/ContentsWrap";
import TabMenu from "../common/TabMenu";
import MyIngredientTradeList from "./MyIngredientTradeList";
function MyIngredientTradePage(){
    return(
        <MobileWrap>
            <Header />
            <ContensWrap>
                <MyIngredientTradeList/>
            </ContensWrap>
            <TabMenu />    
        </MobileWrap>
    )
}

export default MyIngredientTradePage