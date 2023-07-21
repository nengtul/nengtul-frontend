import styled from "styled-components"
import FoodImg from '../assets/recipe/noodle.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useInView } from 'react-intersection-observer';
import {useEffect,useState} from 'react'

function RecipeSection() {
    const [ref, inView] = useInView();
    const [recipes, setRecipes] = useState<JSX.Element[]>([]);
    

    const recipeFetch = () => {
        const newRecipes = Array.from({ length: 5 }, (_, index) => (
          <Recipe key={index + recipes.length}>
            <img src={FoodImg} alt="noodle" />
            <TextArea>
              <Title>비빔국수의 핵심은 양념장!</Title>
              <Heart>
                <FontAwesomeIcon icon={faHeart} style={{ height: "16rem", color: "red" }} />
                <HeartRate>50</HeartRate>
              </Heart>
              <Writer>김제로</Writer>
            </TextArea>
          </Recipe>
        ));
        setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
      };


    useEffect(()=>{
        if(inView){
            console.log('무한스크롤시작')
            recipeFetch()
        }
    },[inView])

    useEffect(()=>{
        const numberOfRecipes = 5; // 생성할 레시피 개수

        const initialRecipeList = Array.from({ length: numberOfRecipes }, (_, index) => (
            <Recipe key={index}>
                <img src={FoodImg} alt="noodle" />
                <TextArea>
                    <Title>비빔국수의 핵심은 양념장!</Title>
                    <Heart>
                        <FontAwesomeIcon icon={faHeart} style={{ height: "16rem", color: "red" }} />
                        <HeartRate>50</HeartRate>
                    </Heart>
                    <Writer>김제로</Writer>
                </TextArea>
            </Recipe>
        ));
        setRecipes(initialRecipeList)
    },[])

    return (
        <RecipeArea>
            {recipes}
            <Observer ref={ref}></Observer>
        </RecipeArea>
    )
}
export default RecipeSection


const RecipeArea=styled.div`
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
`


const Recipe=styled.div`
    display:flex;
    padding:15rem 10rem;
    cursor:pointer;
    border-bottom:1px solid #DDDDDD;
`
const TextArea=styled.div`
    padding:15rem 0 15rem 10rem;
    
`
const Title=styled.div`
    font-size:18rem;
    font-weight:700;
    margin-bottom:12rem;
    
`
const Heart=styled.div`
    
    margin-bottom:12rem;
    display:flex;
    align-items: center

`
const HeartRate=styled.div`
    font-size:14rem;
    margin-left:2%;

`
const Writer=styled.div`
    font-size:14rem;
    
`

const Observer=styled.div`
    width:100%;
    height:3rem;
`