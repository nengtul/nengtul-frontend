import Header from "../common/Header";
import MobileWrap from "../common/MobileWrap";
import ContensWrap from "../common/ContentsWrap";
import GreenBanner from "./GreenBanner";
import TabMenu from "../common/TabMenu";
import InfiniteScroll from "./InfiniteScroll";
import { RECIPE_USER_URL } from "../url";
import { useParams } from 'react-router-dom';
export default function MyRecipePage() {
    const { userId } = useParams();
    console.log(userId)
    const apiEndPoint = `${RECIPE_USER_URL}/${userId}`;

  return (
    <>
      <MobileWrap>
        <Header />
        <ContensWrap>
          <GreenBanner message={'레시피 목록'}/>
          <InfiniteScroll apiEndPoint={apiEndPoint} />
        </ContensWrap>
        <TabMenu />
      </MobileWrap>
    </>
  );
}