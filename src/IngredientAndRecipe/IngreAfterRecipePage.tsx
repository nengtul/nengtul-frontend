import styled from "styled-components"
import MobileWrap from '../common/MobileWrap'
import Header from '../common/Header'
import ChoosedListSection from './ChoosedListSection'
import RecipeSection from './RecipeSection'

function IngreAfterRecipePage(){

    return(
        <MobileWrap>
            <Wrap>
            <Header/>
            <ChoosedListSection/>
            <FlexContainer>
                <RecipeSection/>
            </FlexContainer>
            </Wrap>
        </MobileWrap>


    )
}


const Wrap=styled.div`
    height:100%;
    display:flex;
    flex-direction: column

`

const FlexContainer = styled.div`
  flex: 1; 
  overflow: auto;
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b5b5b5;
    border-radius: 10px;
    width: 2px;
  }
`;
export default IngreAfterRecipePage