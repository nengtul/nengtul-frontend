import { styled } from "styled-components";
import theme from "../common/theme";

interface GreenBannerProps {
  message: string;
}

export default function GreenBanner({ message }: GreenBannerProps) {
  return (
    <Banner>
      <p>{message}</p>
    </Banner>
  );
}

const Banner = styled.div`
  width: 100%;
  background-color: ${theme.colors.main};
  padding: 20px;
  position: fixed;
  top: auto;
  left: auto;
  width: 390px;
  z-index: 10;
  p {
    color: #fff;
    font-size: 20rem;
    font-weight: 700;
    text-align: center;
  }
`;
