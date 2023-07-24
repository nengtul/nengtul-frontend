import styled from "styled-components";
import BannerImg from "../assets/mainpage/mainBanner.png";

const Banner = styled.div`
  width: 100%;
  img {
    width: 100%;
    object-fit: cover;
  }
`;

export default function MainBanner() {
  return (
    <>
      <Banner>
        <img src={BannerImg} alt="main-banner-img" />
      </Banner>
    </>
  );
}
