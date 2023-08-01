import MobileWrap from "../common/MobileWrap.tsx";
import styled from "styled-components";
import EggPart from "../LoginAndNewUser/EggPart.tsx"
import HomePart from "../LoginAndNewUser/HomePart.tsx";
import FindPasswordForm from "./FindPasswordForm.tsx";
function FindPasswordPage(){

    return(
        <MobileWrap>
        <Wrapper>
            <HomePart />
            <EggPart/>
            <FindPasswordForm/>
        </Wrapper>
    </MobileWrap>
    )
}
const Wrapper = styled.div`
  min-height: 844px;
  background-color: #38db83;
`;

export default FindPasswordPage