import ContensWrap from "../common/ContentsWrap";
import Header from "../common/Header";
import MobileWrap from "../common/MobileWrap";
import TabMenu from "../common/TabMenu";
import WriteForm from "./WriteForm";

export default function IngredientWrite() {
  return (
    <>
      <MobileWrap>
        <Header />
        <ContensWrap>
          <WriteForm />
        </ContensWrap>
        <TabMenu />
      </MobileWrap>
    </>
  );
}
