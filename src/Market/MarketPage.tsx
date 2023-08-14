import styled from "styled-components";
import MobileWrap from "../common/MobileWrap";
import Header from "../common/Header";
import Banner from "./Banner";
import MarketInfo from "./MarketInfo";
import MarketMap from "./MarketMap";
import { Provider } from "react-redux";
import store from "../Redux/store";

function MarketPage() {
  return (
    <MobileWrap style={{ height: "800px" }}>
      <MarketPageArea>
        <Header />
        <Banner />
        <Provider store={store}>
          <MarketMap />
          <MarketInfo />
        </Provider>
      </MarketPageArea>
    </MobileWrap>
  );
}

const MarketPageArea = styled.div`
  display: flex;
  height: 100%;
  width: inherit;
  flex-direction: column;
`;
export default MarketPage;
