import {Component, useRef, useEffect} from "react";
import React from "react";
import logo from  "../2i.svg";


function MessageBubbles (props) {
  

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [props.messages]);


  function renderMessage(message) {
    const {member, text} = message;
    const {currentMember} = props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ?
      "Messages-message currentMember" : "Messages-message";
    return (
      <div className={className}>
      <span
        className="avatar"
        style={{backgroundColor: member.clientData.color}}
      >
        <img src={logo} alt="logo" />
      </span>
        <div className="Message-content">
          <div className="username" style={{color: member.clientData.color}}>
            {member.clientData.username}
          </div>
          <div className="text">{text}</div>
        </div>
      </div>
    );
  }


    const {messages} = props;
    return (
      <ul className="Messages-list">
        {messages.map((m, i) => <li key={i} className="classLocator">{renderMessage(m)}</li> )}
        <div style={{ float:"left", clear: "both" }}
             ref={messagesEndRef}>
        </div>
      </ul>
    );
  


}

export default MessageBubbles;
