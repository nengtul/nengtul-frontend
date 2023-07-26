import styled from "styled-components";
import EggIcon from "../assets/icon/EggIcon_png.png";
import HomePart from "./HomePart.tsx";
import MobileWrap from "../common/MobileWrap.tsx";
import LoginForm from "./LoginForm.tsx";
import LoginSNS from "./LoginSNS.tsx";

function Login() {
  return (
    <MobileWrap>
      <Wrapper>
        <HomePart />
        <Egg>
          <EggImg>
            <img src={EggIcon} alt="EggIcon" />
          </EggImg>
        </Egg>
        <LoginForm />
        <LoginSNS />
      </Wrapper>
    </MobileWrap>
  );
}

const Wrapper = styled.div`
  min-height: 844px;
  background-color: #38db83;
`;

const Egg = styled.div`
  width: 150px;
  margin: 0 auto;
`;
const EggImg = styled.div`
  padding-top: 77px;
`;

export default Login;
