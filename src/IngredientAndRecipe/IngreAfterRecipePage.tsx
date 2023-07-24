import styled from 'styled-components';
import MobileWrap from '../common/MobileWrap';
import Header from '../common/Header';
import ChoosedListSection from './ChoosedListSection';
import RecipeSection from './RecipeSection';

function IngreAfterRecipePage() {
  return (
    <MobileWrap>
      <Wrap>
        <Header />
        <ChoosedListSection />
        <RecipeSection />
      </Wrap>
    </MobileWrap>
  );
}

const Wrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default IngreAfterRecipePage;
