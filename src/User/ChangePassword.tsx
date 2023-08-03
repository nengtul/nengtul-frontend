import getLogin from "../ApiCall/getLogin";
import { Tokens } from "../ApiCall/getLogin";
import styled from "styled-components";
import {useState,useCallback,ChangeEvent ,useEffect} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
function ChangePassword(){
    // const MY_TOKEN = getLogin();
    const navigate = useNavigate();
    

    const getUserInfo = useCallback(async () => {
        try {
          const tokens: Tokens | null = await getLogin();
          if (tokens){
            // const url="https://nengtul.shop/v1/user/detail/password";
            const { accessToken} = tokens;
            return accessToken
            // const data ={
            //             password:goPassword
            //         }
            // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            // axios.put(url, data)
            // .then((response)=>{

            
            // console.log('response',response);
            // console.log('비밀번호가 변경되었습니다');
            // navigate('/myPage')
            // })  
            // .catch((error)=>{
            //     console.error(error)
            // })  
        } else{
            return null;
        }
        } catch (err) {
          console.error(err);
          return null;
        }
      }, []);
    useEffect(() => {
        getUserInfo().catch((err) => {
          console.error(err);
        });
      },[]);
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>):void=>{
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const password = formData.get('password') as string;
        getUserInfo()
    .then((MY_TOKEN: string | null) => {
      if (MY_TOKEN) {
        const url = "https://nengtul.shop/v1/user/detail/password";
        const data = {
          password: password,
        };
        console.log('수정할데이터', data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${MY_TOKEN}`;
        axios.put(url, data)
          .then((response) => {
            console.log('response', response);
            console.log('비밀번호가 변경되었습니다');
            navigate('/myPage');
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // MY_TOKEN이 null일 경우 처리
        console.error("토큰을 가져올 수 없습니다.");
      }
    })
    .catch((err) => {
      console.error(err);
    });
        // try{
        //     const MY_TOKEN: string | null = await getUserInfo();
        //     const url="https://nengtul.shop/v1/user/detail/password"
        //     const data ={
        //         password:password
        //     }
        //     console.log('수정할데이터',data)
        //     axios.defaults.headers.common['Authorization'] = `Bearer ${MY_TOKEN}`;
        //     axios.put(url, data)
        //     .then((response) => {
        //       console.log('response',response);
        //       console.log('비밀번호가 변경되었습니다');
        //       navigate('/myPage')
        //     })
        //     .catch((error) => {
        //       console.error(error);
        //     });
        // }catch (err) {
        //     console.log(err)
        // }
        
          
            
        }
    const [password, setPassword] = useState('');
    const [ispassword, setIsPassword] = useState<boolean>(false)
    const onChangePassword=useCallback((e:ChangeEvent<HTMLInputElement>)=>{
        const passwordRegex = /^.{8,}$/;
        const passwordCurrent=e.target.value
        setPassword(passwordCurrent)
        if (!passwordRegex.test(passwordCurrent)){
            setIsPassword(false)
        }else{
            setIsPassword(true)
        }
    },[])
    
        //비밀번호 확인
    const [passwordCheck, setPasswordCheck] = useState('');
    
    const [ispasswordcheck, setIsPasswordCheck] = useState<boolean>(false)
    const onChangePasswordCheck=useCallback((e:ChangeEvent<HTMLInputElement>)=>{
        const passwordCheckCurrent=e.target.value
        setPasswordCheck(passwordCheckCurrent)
        if (password === passwordCheckCurrent) {
            setIsPasswordCheck(true)
            } else {
            setIsPasswordCheck(false)
            }
    },[password])
    return (
        <>
        <ChangePasswordPart>비밀번호 변경</ChangePasswordPart>
        <form onSubmit={handleSubmit}>
        <InputPart>
            <InputArea id="Password">
                <Title>비밀번호</Title>
                <InputWrapper>
                    <input type='password' name="password" onChange={onChangePassword}></input>
                    <Message > 
                    {password.length > 0 && 
                    (ispassword?
                     (<div style={{color:'#5b90fb', fontSize:'20rem'}}> 안전한 비밀번호에요 :) </div>)
                    :(<div style={{color:'red' , fontSize:'17rem'}}>  8자리 이상의 비밀번호를 입력해주세요 </div>)
                    )}
                    </Message>
                </InputWrapper>
            </InputArea>
            <InputArea id="PasswordCheck">
                <Title>비밀번호 확인</Title>
                <InputWrapper>
                    <input type='password' onChange={onChangePasswordCheck} ></input>
                    <Message > 
                    {passwordCheck.length > 0 && 
                      (ispasswordcheck?
                      (<div style={{color:'#5b90fb', fontSize:'20rem'}}> 비밀번호를 똑같이 입력했어요 : ) </div>)
                      :(<div style={{color:'red', fontSize:'17rem'}}>  비밀번호가 틀려요. 다시 확인해주세요ㅜㅜ </div>)
                      )
                    }
                    </Message>
                </InputWrapper>
                </InputArea>
            
        </InputPart>
        <Button>
            <SquareButton type='submit' id='newUser'>비밀번호 바꾸기</SquareButton>
        </Button>
    </form>
    </>
    )

}
export default ChangePassword

const ChangePasswordPart=styled.h1`
    width:46%;
    font-size:30rem;
    margin: 0 auto;
    color:#38db83;
    margin-top:50rem;
    margin-bottom:70rem;
`

const InputPart = styled.div`
    margin: 0 auto;
    width: 90%;
    margin-bottom: 20rem;
`;

const InputArea = styled.div`
    width: 100%;
    height: 85rem;
    margin-bottom: 60rem;
`;

const Title = styled.div`
    font-size: 20rem;
    font-weight: 700;
    color: #38db83;
    margin-bottom: 8rem;
`;
const InputWrapper = styled.div`
    position: relative;
    width: 99%;
    height: 45rem;
    border: 2rem solid #38db83;
    border-radius: 4rem;
    input {
        padding-left: 5%;
        padding-right: 5%;
        width: 90%;
        height: 95%;
        font-size: 16rem;
        outline: none;
        border: none;
        color: #38db83;
    }

    input::placeholder {
        color: #38db83;
    }
`;

const SquareButton = styled.button`
    background-color:#38db83;
    font-weight:700;
    color:white;
    cursor:pointer;
    width:70%;
    text-align:center;
    padding:20rem 40rem ;
    font-size:20rem;
    margin: 30rem auto;
    border:1px solid #38DB83;
    border-radius:40rem;
    
`
const Button=styled.div`
    width:90%;
    height: 6%;
    margin: 0 auto;
    position:relative;
    display:flex;
`
const Message=styled.div`
    width:90%;
    color:white;
    margin: 0 auto;
    margin-top:6%;
    text-align:center;
   
`