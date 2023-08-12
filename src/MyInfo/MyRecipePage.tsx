import Header from "../common/Header";
import MobileWrap from "../common/MobileWrap";
import ContensWrap from "../common/ContentsWrap";
import GreenBanner from "./GreenBanner";
import TabMenu from "../common/TabMenu";
import InfiniteScroll from "./InfiniteScroll";
import { RECIPE_USER_URL } from "../url";

export default function MyRecipePage() {
  const apiEndPoint = RECIPE_USER_URL;

  return (
    <>
      <MobileWrap>
        <Header />
        <ContensWrap>
          <GreenBanner message={'작성한'}/>
          <InfiniteScroll apiEndPoint={apiEndPoint} />
        </ContensWrap>
        <TabMenu />
      </MobileWrap>
    </>
  );
}
