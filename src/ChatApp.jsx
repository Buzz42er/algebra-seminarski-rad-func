import './App.css';
import { Component, useState } from 'react';
import MessageBubbles from './components/MessageBubbles';
import InputField from './components/InputField';
import logo from  "./2i.svg";
import { useEffect } from 'react';

function randomName() {
  const adjectives = [
    "autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark",
    "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter",
    "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue",
    "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long",
    "late", "lingering", "bold", "little", "morning", "muddy", "old", "red",
    "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering",
    "withered", "wild", "black", "young", "holy", "solitary", "fragrant",
    "aged", "snowy", "proud", "floral", "restless", "divine", "polished",
    "ancient", "purple", "lively", "nameless"
  ];
  const nouns = [
    "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
    "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
    "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
    "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
    "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
    "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
    "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
    "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog",
    "smoke", "star"
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}


function ChatApp () {


    const [buble, setBuble] = useState({
      messages: [],
      member: {
      username: randomName(),
      color: randomColor(),
    }
    })

    const onSendMessage = () => {};
    
  useEffect(() => {
    const drone = new window.Scaledrone("KRxTFNfTQOZwor7e", {
      data: buble.member
    });
        drone.on('open', error => {
          if (error) {
            return console.error(error);
          }
          const member = {...buble.member};
          member.id = drone.clientId;
        });
        const room = drone.subscribe("observable-room");
        room.on('data', (data, member) => {
          const messages = buble.messages;
          messages.push({member, text: data});

        });

        onSendMessage = (message) => {
          drone.publish({
            room: "observable-room",
            message
          });
        }
        
  }, [])
  
  

  return (
    <div className="App">
      {/* header-------------------------------------------------------------------------------------- */}
      <header>
        <section className='logo-section'>
          {/* logo */}
          <img src={logo} alt="" width={40} height={40} className="logo"/>
        </section>
        <section className='nav-section'>
          {/* nav */}
          	<nav>
          	  <ul>
          	    {/* <NavListItem/> */}
          	  </ul>
            </nav>
          </section>   
      </header>
      {/* main ----------------------------------------------------------------------------------------*/}
      <main>
        <section className='chat-rooms-section'>
          {/* avalible chat rooms */}
        </section>
        <section className='chat-section'>
          {/* current chat */}
          <div className='messages-div'>
            {/* message area */}
            <MessageBubbles
              messages={buble.messages}
              currentMember={buble.member}
            />
          </div>
          <div className='input-div'>
            {/* input area */}
            <InputField
              onSendMessage={onSendMessage}
            />
          </div>
        </section>
      </main>
      {/* footer --------------------------------------------------------------------------------------------*/}
      <footer>
        <p>Made by Jure Ereš</p>
      </footer>
    </div>
  );
}
export default ChatApp;
