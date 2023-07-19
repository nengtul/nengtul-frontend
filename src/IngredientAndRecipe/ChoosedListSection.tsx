import styled from "styled-components"

function ChoosedListSection(){
    return (
        <GreenArea>
            <MainArea>
            <Text>
                선택하신 재료로
                <br/>
                요리 가능한 레시피 입니다!
            </Text>
            <IngredientArea>
                <GridItem><Ingredient>계란</Ingredient></GridItem>
                <GridItem><Ingredient>굴소스</Ingredient></GridItem>
                <GridItem><Ingredient>참치</Ingredient></GridItem>
                <GridItem><Ingredient>참치액</Ingredient></GridItem>
                <GridItem><Ingredient>참기름</Ingredient></GridItem>
                <GridItem><Ingredient>들기름</Ingredient></GridItem>
            </IngredientArea>
            </MainArea>
        </GreenArea>

    )
}


const GreenArea=styled.div`
    background-color:#38DB83;
    width:100%;
    height:auto;    
    margin-top:41px;
`
const MainArea=styled.div`
    padding:20rem 0 16rem 0;
`
const Text=styled.div`
    width:60%;
    height:auto;
    margin: 0 auto;
    color:#fff;
    font-size:20px;
    text-align:center;
    line-height: 1.3;
    `

const IngredientArea=styled.div`
    display: grid;
    margin: 0 auto;
    margin-top:4%;
    width: 75%;
    height:auto;


    grid-template-columns: repeat(3, 1fr);
    justify-content: center;

`
const GridItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Ingredient=styled.div`

    width:80rem;
    height:34rem;
    font-size:14rem;
    background-color:#fff;
    color:#38DB83;
    border-radius:10rem;
    text-align:center;

    padding: 9rem;
    margin-bottom:13%;
`
export default ChoosedListSection