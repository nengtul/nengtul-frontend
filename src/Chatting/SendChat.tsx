import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera,faArrowUp } from "@fortawesome/free-solid-svg-icons";
import {useRef,useEffect,useState,ChangeEvent,KeyboardEvent} from 'react';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../Store/store";
import * as StompJs from '@stomp/stompjs';
interface SendChatProps {
    updateChatInfo: (newInfo: string) => void; 
    stompClient: StompJs.Client;
    selectedMarkerId: number; 
  }
function SendChat({ updateChatInfo, stompClient ,selectedMarkerId}:SendChatProps){
    const [first,setFirst]=useState(false)
    const inputTextRef = useRef<HTMLTextAreaElement>(null!);
    const Token = useSelector((state: RootState) => state.accessTokenValue);
    const { accessTokenValue} = Token;
    const MY_TOKEN = accessTokenValue;
    const [inputValue, setInputValue] = useState('');
    const updateHeight=()=>{
        if (inputTextRef.current) {
            inputTextRef.current.style.height = '40rem';
            inputTextRef.current.style.height = inputTextRef.current.scrollHeight.toString() + 'px';
          }
        }
    function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter") {
            e.preventDefault(); // 엔터 키의 기본 동작인 줄바꿈 방지
            handleSubmit();
        }
    }
    useEffect(() => {
            
        updateHeight();
          
    }, [inputValue]);
        

    const handleChange = (event :ChangeEvent<HTMLTextAreaElement>) => {
        updateHeight();
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        if (inputValue.trim() !== '') {
            if(!first){
                console.log('여기까진 가나??')
                stompClient.publish({
                    destination:`/pub/chat/start/shareboards/${selectedMarkerId}`,
                    body: 
                        inputValue
                    ,
                    headers:{Authorization: `Bearer ${MY_TOKEN}`},
                }
                )
                    setFirst(true)
            }else{
                // stompClient.publish('/pub/chat/send/rooms/{roomId}', {}, JSON.stringify({ message: inputValue }));
            }
          setInputValue('');
          inputTextRef.current.style.height = '40rem';
          updateChatInfo(inputValue);
        }
      };
    
    return(
        <SendChatArea >
            <FontAwesomeIcon icon={faCamera} style={{color: "#000000",height:"30rem",padding:"0 11rem 0 17rem",cursor:"pointer"}} />
            <InputText  ref={inputTextRef} value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown}></InputText>
            <SendButton type="submit"  onClick={handleSubmit} ><FontAwesomeIcon icon={faArrowUp} style={{color: "#fff",height:"30rem",padding:"2rem"}} /></SendButton>
        </SendChatArea>
        
    )
}

const SendChatArea=styled.div`
    width:inherit;
    bottom:0;
    display:flex;
    align-items:center;
    padding-top:10rem;
    padding-bottom:10rem;
    border-top:1px solid #dddddd;
`

const InputText=styled.textarea`
    width:70%;
    max-height: 250rem;
    background-color:#dddddd;
    resize: none;
    word-wrap: break-word;
    white-space: pre-wrap;
    padding:5px;
    font-size:20rem;
    border:none;
    border-radius:7rem;
    outline: none;
    overflow:hidden;
`
const SendButton = styled.button`
    width:37rem;
    height:37rem;
    border-radius:100%;
    background-color:#38DB83;
    margin-left:8rem;
    cursor:pointer;
`

export default SendChat