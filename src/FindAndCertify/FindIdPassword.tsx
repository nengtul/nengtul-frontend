import styled from "styled-components";
import { Link } from "react-router-dom";
function FindIdPassword(){
    return(
        <Part>
        <Link to="/findId">
            <IdPassword>아이디가 기억이 안나시나요?</IdPassword>
        </Link>
        <Link to="/findPassword">
            <IdPassword>비밀번호가 기억이 안나시나요?</IdPassword>
        </Link>
        </Part>
    )
}
export default FindIdPassword

const Part=styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
`
const IdPassword=styled.div`
    font-size:17rem;
    color:white;
    cursor:pointer;
    text-decoration:underline;
    margin:10rem;
`
