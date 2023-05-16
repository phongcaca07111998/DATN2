import React, { useEffect, useState } from "react";
import { Banner } from '../../Components/banner/banner'
import './Home.scss'
import '../../Components/layout/Seller/chatbox.css'
import { SuggestionProduct } from "../../Components/suggertionProduct/suggertionProduct";
import { NewsuggestionProduct } from "../../Components/suggertionProduct/newsuggertionProduc";


import { Category } from "../../Components/category/category";
import Categories from "../../Components/MainPage/Categories";
import useGetData from "../../custom-hooks/useGetData";
import { Likesuggetion } from "../../Components/suggertionProduct/likesuggetion";


export const Home = (props) => {
  // const [inputText, setInputText] = useState("");
  // const [messages, setMessages] = useState([]);
  // const [showChatbox, setShowChatbox] = useState(false);
  // const [showButton, setShowButton] = useState(true);
  const [showChatbox, setShowChatbox] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const toggleChatbox = () => {
    setShowChatbox((prev) => !prev);
  };

  const handleInputTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    setMessages([...messages, inputText]);
    setInputText("");
  };

  const handleExitChatbox = () => {
    setShowChatbox(false);
  };

  // const handleInputTextChange = (event) => {
  //   setInputText(event.target.value);
  // };
  // const toggleChatbox = () => {
  //   setShowChatbox(!showChatbox);
  //   setShowButton(false);
  // };
  // const handleSendMessage = () => {
  //   if (inputText.trim() !== "") {
  //     setMessages([...messages, inputText]);
  //     setInputText("");
  //   }
  // };

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     handleSendMessage();
  //   }
  // };
return (
  <div className="container">
    <div className="Home_content">
      <div className="banner">
        <div className="ct1"><Categories/></div>
        <div className="bn1"><Banner/></div>
      </div>
      <div className="Content Content_2">
        <Likesuggetion tieude="SẢN PHẨM YÊU THÍCH"/>
        </div>
      <div className="Content Content_2">
        <NewsuggestionProduct tieude="MẶC HÀNG MỚI NHẤT" />
      </div>
      <div className="Content Content_2">
        <SuggestionProduct tieude="MẶC HÀNG GIẢM GIÁ"/>
      </div>
      <div className="Content Content_2">
        <SuggestionProduct tieude="TẤT CẢ SẢN PHẨM"/>
      </div>
      
         
            {/* {showButton && (
            <button className="chatbox-button" onClick={toggleChatbox}>Mở chatbox</button>
            )}
            {showChatbox && (
            <div className="chat-box">
      <div className="chat-box-messages">
        {messages.map((message, index) => (
          <div key={index} className="chat-box-message">
            {message}
          </div>
        ))}
      </div>
      <div className="chat-box-input">
        <input
          type="text"
          placeholder="Type your message here..."
          value={inputText}
          onChange={handleInputTextChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
     )} */}
      </div>
    </div>
  );

};
export default Home;