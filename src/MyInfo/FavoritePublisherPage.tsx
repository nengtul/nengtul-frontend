import Header from "../common/Header";
import MobileWrap from "../common/MobileWrap";
import ContensWrap from "../common/ContentsWrap";
import GreenBanner from "./GreenBanner";
import TabMenu from "../common/TabMenu";
import InfiniteScroll2 from "./InfiniteScroll2";
import { FAV_URL } from "../url";
export default function FavoritePublisherPage() {
  const apiEndPoint =FAV_URL;

  return (
    <>
      <MobileWrap>
        <Header />
        <ContensWrap>
          <GreenBanner message={"회원님이 즐겨찾기 해둔 유저입니다"} />
          <InfiniteScroll2 apiEndPoint={apiEndPoint} />
        </ContensWrap>
        <TabMenu />
      </MobileWrap>
    </>
  );
}