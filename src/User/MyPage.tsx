import MobileWrap from "../common/MobileWrap";
import Header from "../common/Header";
import ContensWrap from "../common/ContentsWrap";
import TabMenu from "../common/TabMenu";
import UserInfomation from "./UserInfomation";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import NeedLogin from "./NeedLogin";
function MyPage() {
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;
  return (
    <MobileWrap>
      <Header />
      <ContensWrap>{MY_TOKEN ? <UserInfomation /> : <NeedLogin />}</ContensWrap>
      <TabMenu />
    </MobileWrap>
  );
}

export default MyPage;
