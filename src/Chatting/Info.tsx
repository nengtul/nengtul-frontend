import styled from "styled-components";
import { Post } from "../IngredientMap/MarkerMap";
interface MarkerProps {
    selectedMarker: Post;
  
  }
  
function Info({selectedMarker}:MarkerProps){
    return (
        <InfoArea>
            <InfoPic><img src={selectedMarker.shareImg}/></InfoPic>
            <InfoText>
                <div style={{display:"flex", paddingBottom:"7rem"}}>
                    <InfoState>거래중</InfoState>
                    <InfoTitle>{selectedMarker.title}</InfoTitle>
                </div>
                <InfoPrice>{selectedMarker.price}원</InfoPrice>
            </InfoText>
        </InfoArea>
    )

}

const InfoArea= styled.div`
    width:inherit;
    position:fixed;
    margin-top:56rem;
    padding: 15rem;
    display:flex;
    border-bottom:1px solid #dddddd;
`
const InfoPic= styled.div`
    width:55rem;
    height:55rem;
    background-color:#DDDDDD;
    border-radius:5rem;
    img{
        width:55rem;
        height:55rem;
    }
`
const InfoText=styled.div`
    display:flex;
    flex-direction: column;
    padding:10rem 0 10rem 15rem;
`
const InfoState= styled.div`
    font-size: 14px;
    font-weight:bold;
    padding-right:10rem;
`
const InfoTitle= styled.div`
    font-size: 14px;
`
const InfoPrice= styled.div`
    font-size: 13px;
    font-weight:bold;
`

export default Info