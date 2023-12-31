import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
// import { Post } from "../IngredientMap/MarkerMap";
// interface MarkerProps {
//     selectedMarker: Post;
  
//   }
function ChatHeader({ user }: { user: string }){
    const navigate = useNavigate();
    return (
        <ChtHeader>
            <Header>
                <UserName>{user}</UserName>
            </Header>
            <GoBack>
            <FontAwesomeIcon icon={faChevronLeft} style={{ height: "23rem", color: "black" }} onClick={() => {navigate(-1);}}/> 
            </GoBack>
        </ChtHeader>
    )
}

const ChtHeader=styled.div`
    position:fixed;
    border-bottom: 1px solid #DDDDDD;
    background-color:white;
`
const Header=styled.div`
    position:fixed;
    width:390rem;
    border-radius: 20px 20px 0 0;
    height: 56rem;
    display: flex;
    justify-content: center; 
    align-items: center; 
    border-bottom: 1px solid #DDDDDD;
`
const GoBack= styled.button`
    width:56rem;
    height:55rem;
    background-color:white;
    border-radius:20px 0 0  0;
    cursor:pointer;
    position:relative;
`
const UserName=styled.div`
    font-size:20rem;
    font-weight:600;
    text-align:center;
`

export default ChatHeader