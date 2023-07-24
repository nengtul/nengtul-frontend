import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera,faArrowUp } from "@fortawesome/free-solid-svg-icons";
import {useRef,useEffect,useState,ChangeEvent} from 'react';

interface SendChatProps {
    updateChatInfo: (newInfo: string) => void; 
  }
function SendChat({ updateChatInfo }:SendChatProps){

    const inputTextRef = useRef<HTMLTextAreaElement>(null!);

    const [inputValue, setInputValue] = useState('');
    const updateHeight=()=>{
        if (inputTextRef.current) {
            inputTextRef.current.style.height = '40rem';
            inputTextRef.current.style.height = inputTextRef.current.scrollHeight.toString() + 'px';
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
          setInputValue('');
          inputTextRef.current.style.height = '40rem';
          updateChatInfo(inputValue);
        }
      };
    
    return(
        <SendChatArea >
            <FontAwesomeIcon icon={faCamera} style={{color: "#000000",height:"30rem",padding:"0 11rem 0 17rem",cursor:"pointer"}} />
            <InputText  ref={inputTextRef} value={inputValue} onChange={handleChange} ></InputText>
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