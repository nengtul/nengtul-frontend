import styled from "styled-components"
import HomeIcon from '../assets/icon/HomeIcon.svg'
function HomePart(){
    return(
        <Home>
            <HomeImg>
                <img src={HomeIcon} alt="HomeIcon" />
            </HomeImg>
        </Home>
    )
}
export default HomePart

const Home= styled.div`

`
const HomeImg=styled.div`
    padding-top: 19px;
    padding-left:20px;
    cursor:pointer;
`