import './App.css';
import './normal.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

function App() {

  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "Hola, en qué puedo ayudarte?"
  }]);

  // Clear chats:
  function clearChat () {
    setChatLog([]);
  }

  async function handleSubmit (e) {
    e.preventDefault();
    //setChatLog([...chatLog, {user: "me", message: `${input}`}])
    let chatLogNew = [...chatLog, {user: "me", message: `${input}`}];
    setInput("");
    setChatLog(chatLogNew);

    const messages = chatLogNew.map((message) => message.message).join("\n");


    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages
      })
    });

    const data = await response.json();
    setChatLog([...chatLogNew, {user: "gpt", message: `${data.message}`}]);
    console.log(data.message);
  }

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          Nuevo Chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index) => (<ChatMessage key={index} message={message}/>))}
          
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit} className="chat-input-form">
            <div className="chat-input-wrapper">
              <input 
                rows="1" 
                value={input} 
                onChange={(e) => setInput(e.target.value) }
                className="chat-input-textarea"></input>
              <button type="button" onClick={handleSubmit} className="chat-input-button">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
            
          </form>
        </div>

      </section>
      
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}></div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  )
}

export default App;
