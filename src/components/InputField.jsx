import {useState} from "react";
import React from "react";

function InputField (props) {


  const [text, setText] = useState("")

  function onChange(e) {
    setText({text: e.target.value});
    
  }

  function onSubmit(e) {
    e.preventDefault();
    setText({text: ""});
    props.onSendMessage(text);
  }

    return (
      <div className="Input">
        <form onSubmit={e => onSubmit(e)}>
          <input
            onChange={e => onChange(e)}
            value={text}
            type="text"
            placeholder="Enter your message and press ENTER"
            autoFocus= {true}
          />
          <button>
            <span className="material-symbols-outlined">
              send
            </span>
          </button>
        </form>
      </div>
    );
}


export default InputField;