import MobileWrap from "../common/MobileWrap";
import Header from "../common/Header";
import ContensWrap from "../common/ContentsWrap";
import TabMenu from "../common/TabMenu";
import NoticeView from "./NoticeView";
function NoticeViewPage(){
    return(
        <MobileWrap>
                <Header />
                <ContensWrap>
                    <NoticeView/>
                </ContensWrap>
                <TabMenu />    
        </MobileWrap>
    )
}

export default NoticeViewPage