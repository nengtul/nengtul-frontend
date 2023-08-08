import Header from "../common/Header";
import MobileWrap from "../common/MobileWrap";
import ContensWrap from "../common/ContentsWrap";
import TabMenu from "../common/TabMenu";
import NoticeWriteWrap from "./NoticeWriteWrap"

export default function NoticeWritePage() {
  return (
    <>
      <MobileWrap>
        <Header />
        <ContensWrap>
          <NoticeWriteWrap/>
        </ContensWrap>
        <TabMenu />
      </MobileWrap>
    </>
  );
}
