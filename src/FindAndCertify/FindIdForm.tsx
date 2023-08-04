import styled from "styled-components";
import axios from "axios";
import { USER_FINDID_URL } from "../url";
function FindIdForm(){
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>): void=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const tel = formData.get('tel') as string;
        console.log(name,tel)
        
        handleNewUser(name,tel).catch((err)=>{
            console.error(err);
        })
    
    }
    const handleNewUser=async(name:string,tel:string)=>{
        try{
            // const url="http://43.200.162.72:8080/v1/user/findid/${name}/${phoneNumber}"
            const url=USER_FINDID_URL;
            const data ={
                name: name,
                phoneNumber: tel
            }
            const response = await axios.post(url,data);
            console.log('이거',response);
            if(response.data){
                const responseData = response.data  as { email?: string }
                alert(responseData.email)
            }else{
                console.log('회원 정보가 없거나 이름/전화번호를 잘못 입력하셨습니다')
            }
        }catch (err) {
            console.error("아이디 찾기 실패", err);
          }
    }
    return(
       <form onSubmit={handleSubmit}>
            <InputPart>
                <InputArea id="Name">
                    <Title>이름</Title>
                    <InputWrapper>
                        <input type='text'name="name"></input>
                    </InputWrapper>
                </InputArea>
                <InputArea id="PhoneNumber">
                    <Title>휴대폰번호  ex 010-1111-1111</Title>
                    <InputWrapper>
                        <input type='tel' name="tel"></input>
                    </InputWrapper>
                </InputArea>
            </InputPart>
            <Button>
                <SquareButton type='submit' id='newUser'>아이디 찾기</SquareButton>
            </Button>
        </form>

    )
}

const InputPart = styled.div`
  margin: 0 auto;
  width: 90%;
  margin-bottom: 20rem;
`;

const InputArea = styled.div`
  width: 100%;
  height: 85rem;
  margin-bottom: 5rem;
  // background-color:white;
`;

const Title = styled.div`
  font-size: 16rem;
  font-weight: 700;
  color: white;
  margin-bottom: 8rem;
`;
const InputWrapper = styled.div`
  position: relative;
  width: 99%;
  height: 45rem;
  border: 2rem solid white;
  border-radius: 4rem;
  input {
    padding-left: 5%;
    padding-right: 5%;
    width: 90%;
    height: 95%;
    font-size: 16rem;
    background-color: #38db83;

    outline: none;
    border: none;
    color: white;
  }

  input::placeholder {
    color: white;
  }
`;

const SquareButton = styled.button`
    width: 100%;
    height: 55rem;
    background-color:white;
    border: 2rem solid white;
    border-radius:4rem;
    margin-bottom:14rem;
    font-size: 20rem;
    font-weight:700;
    color:#38DB83;
    text-align:center;
    cursor:pointer;
    &:first-of-type {
        margin-top: 6rem;
      }
    
    
`
const Button=styled.div`
    width:90%;
    height: 6%;
    margin: 0 auto;
    margin-bottom:14rem;
    position:relative;
`

export default FindIdForm