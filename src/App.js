import './App.css';
import { useState } from 'react';

function App() {
  const [anger, setAnger] = useState(0);
  const [text, setText] = useState("");
  const [timer, setTimer] = useState(null);
  let velocity = 1;
  const handleKeyDown = (e) => {
    if(e.key === "Delete" || e.key === "Backspace") {
      if(!timer) {
      let currentAnger = anger > 6375 ? 6375 : anger;
      let currentText = text;
        let interval = setInterval(() => {
          if(currentAnger > 0) setAnger(currentAnger - velocity);
          if(currentText) {
            currentText = currentText.slice(0, velocity < currentText.length ? currentText.length - velocity : 0);
            setText(currentText);
          };
          console.log(velocity, " ", currentText.length);
          (velocity < 100) && (velocity += 0.01);
          currentAnger--;
        }, 4)
        setTimer(interval);
      }
      return
    } 
    if(!timer) {
      let currentAnger = anger;
      let currentText = text;
      let interval = setInterval(() => {
        let textAddition = "";
        for(let i=0; i<velocity; i++) {
          textAddition += "A";
        }
        if(currentAnger < 6375) setAnger(currentAnger+velocity);
        setText(currentText+textAddition);
        (velocity < 100) && (velocity += 0.01);
        currentAnger++;
        currentText += textAddition;
        console.log(velocity, " ", currentText.length);
      }, 4)
      setTimer(interval)
    }
  }

  const handleKeyUp = () => {
    clearInterval(timer);
    setTimer(null);
    velocity = 1;
  }
  return (
    <section tabIndex={0} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} style={{backgroundColor: `rgb(255, ${255-(anger/25)}, ${255-(anger/25)})`}}>
      <div style={{maxWidth: `${(anger/20)+25}%`, fontSize: `${anger/50+10}px`, letterSpacing: `${(anger/250)+1}px`}}>{text}</div>
    </section>
  );
}

export default App;
