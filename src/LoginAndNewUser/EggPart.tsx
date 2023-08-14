import styled from "styled-components";
import EggIcon from "../assets/icon/EggIcon_png.png";
function EggPart() {
  return (
    <Egg>
      <EggImg className="egg-img">
        <img src={EggIcon} alt="EggIcon" />
      </EggImg>
    </Egg>
  );
}

const Egg = styled.div`
  width: 150px;
  margin: 0 auto;
`;
const EggImg = styled.div`
  padding-top: 77px;
`;

export default EggPart;
