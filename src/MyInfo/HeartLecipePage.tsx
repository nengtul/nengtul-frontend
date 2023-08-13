import Header from "../common/Header";
import MobileWrap from "../common/MobileWrap";
import ContensWrap from "../common/ContentsWrap";
import GreenBanner from "./GreenBanner";
import TabMenu from "../common/TabMenu";
import InfiniteScroll from "./InfiniteScroll";
import { LIKES_URL } from "../url";
export default function HeartLecipePage() {
  const apiEndPoint = LIKES_URL;

  return (
    <>
      <MobileWrap>
        <Header />
        <ContensWrap>
          <GreenBanner message={'회원님이 좋아요 누른 레시피입니다.'} />
          <InfiniteScroll apiEndPoint={apiEndPoint} />
        </ContensWrap>
        <TabMenu />
      </MobileWrap>
    </>
  );
}
