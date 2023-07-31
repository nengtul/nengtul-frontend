import Header from "../common/Header";
import MobileWrap from "../common/MobileWrap";
import ContensWrap from "../common/ContentsWrap";
import TabMenu from "../common/TabMenu";
import NoticeWrap from "./ListWrap";

export default function NoticeListPage() {
  return (
    <>
      <MobileWrap>
        <Header />
        <ContensWrap>
          <NoticeWrap />
        </ContensWrap>
        <TabMenu />
      </MobileWrap>
    </>
  );
}
