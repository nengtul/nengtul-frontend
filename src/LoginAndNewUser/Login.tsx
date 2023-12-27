import styled from "styled-components";
import EggPart from "./EggPart.tsx";
import HomePart from "./HomePart.tsx";
import MobileWrap from "../common/MobileWrap.tsx";
import LoginForm from "./LoginForm.tsx";
// import LoginSNS from "./LoginSNS.tsx";
import FindIdPassword from "../FindAndCertify/FindIdPassword.tsx";
export default function Login() {
  return (
    <MobileWrap>
      <Wrapper>
        <HomePart />
        <EggPart />
        <LoginForm />
        {/* <LoginSNS /> */}
        <FindIdPassword/>
      </Wrapper>
    </MobileWrap>
  );
}

const Wrapper = styled.div`
  height: calc(100vh - 60px);
  max-height: 844px;
  background-color: #38db83;
`;
