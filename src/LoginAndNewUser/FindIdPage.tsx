import styled from "styled-components";
import EggPart from "./EggPart.tsx"
import HomePart from "./HomePart.tsx";
import MobileWrap from "../common/MobileWrap.tsx";
import FindIdForm from './FindIdForm.tsx';
function FindId(){
    return(
        <MobileWrap>
            <Wrapper>
                <HomePart />
                <EggPart/>
                <FindIdForm/>
            </Wrapper>
        </MobileWrap>
    )
}

const Wrapper = styled.div`
  min-height: 844px;
  background-color: #38db83;
`;



export default FindId