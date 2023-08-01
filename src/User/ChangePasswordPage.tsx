import MobileWrap from "../common/MobileWrap";
import Header from "../common/Header";
import ContensWrap from "../common/ContentsWrap";
import TabMenu from "../common/TabMenu";
import ChangePassword from "./ChangePassword";
function ChangePassowordPage(){
    return (
        <MobileWrap>
                <Header />
                <ContensWrap>
                    <ChangePassword/>
                </ContensWrap>
                <TabMenu />    
        </MobileWrap>
    )
}

export default ChangePassowordPage