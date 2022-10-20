import './App.css';
import { useState } from 'react';

function App() {
  const [anger, setAnger] = useState(0);
  const [text, setText] = useState("");
  const handleKeyDown = (e) => {
    setAnger(anger+1);
    setText(text+"A");
  }
  return (
    <section tabIndex={0} onKeyDown={handleKeyDown} style={{backgroundColor: `rgb(255, ${255-anger}, ${255-anger})`}}>
      <div>{text}</div>
    </section>
  );
}

export default App;
