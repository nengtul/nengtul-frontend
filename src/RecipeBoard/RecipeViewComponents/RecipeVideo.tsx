import styled from "styled-components";
import ReactPlayer from "react-player";

export default function RecipeVideo() {
  return (
    <Player>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=j7s9VRsrm9o&t=3s"
        controls
        width={"100%"}
        height={"100%"}
      />
    </Player>
  );
}

const Player = styled.div`
  width: 100%;
  height: 270px;
  background-color: #333;
  padding-top: 58px;
`;
