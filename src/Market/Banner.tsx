import styled from "styled-components";

function Banner(){
    return (
        <BannerArea>
            <Text>
                근처 마트를 찾아보세요!
            </Text>
        </BannerArea>
    )
}

const BannerArea=styled.div`
    // width:100%;
    width:inherit;
    height:7%;
    background-color: #38DB83;
    margin-top:56rem;
    display:flex;
    align-items: center;
    justify-content: center;
`

const Text=styled.div`
    font-size:20rem;
    font-weight:bold;
    color:white;
`
export default Banner