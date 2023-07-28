import Header from "../common/Header";
import MobileWrap from "../common/MobileWrap";
import ContensWrap from "../common/ContentsWrap";
import GreenBanner from "./GreenBanner";
import TabMenu from "../common/TabMenu";
import InfiniteScroll from "./InfiniteScroll";

export default function HeartLecipePage() {
  const apiEndPoint = "http://localhost:5000/posts";

  return (
    <>
      <MobileWrap>
        <Header />
        <ContensWrap>
          <GreenBanner />
          <InfiniteScroll apiEndPoint={apiEndPoint} />
        </ContensWrap>
        <TabMenu />
      </MobileWrap>
    </>
  );
}
