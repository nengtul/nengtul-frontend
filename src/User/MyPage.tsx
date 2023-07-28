import MobileWrap from "../common/MobileWrap";
import Header from "../common/Header";
import ContensWrap from "../common/ContentsWrap";
import TabMenu from "../common/TabMenu";
import UserInfomation from './UserInfomation'
function MyPage(){
    return(
        <MobileWrap>
                <Header />
                <ContensWrap>
                    <UserInfomation/>
                </ContensWrap>
                <TabMenu />    
        </MobileWrap>
    )
}

export default MyPage