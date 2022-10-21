import './App.css';
import scream from './assets/screamSegment.wav';
import { useState } from 'react';

const audioElement = new Audio(scream);

function App() {
  const [anger, setAnger] = useState(0);
  const [text, setText] = useState("");
  const [scale, setScale] = useState(1.1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const handleMouseMove = e => {
    const movementValue = Math.floor(Math.abs(e.movementX/50)+Math.abs(e.movementY/50));
    let textAddition = "";
    for(let i=0; i<Math.floor(movementValue); i++) {
      textAddition += "A";
    }
    setScale(1.1+(Math.random()*(movementValue/75))-(movementValue/75));
    setTranslateX(Math.random()*(movementValue)-(movementValue));
    setTranslateY(Math.random()*(movementValue)-(movementValue));
    setAnger(anger+movementValue);
    setText(text+textAddition);
  }

  const handleKeyPress = (e) => {
    const value = Math.ceil(Math.random()*10);
    let textAddition = "";
    for(let i=0; i<value; i++) {
      textAddition += "A";
    }
    setAnger(anger+value);
    setText(text+textAddition)
  }

  return (
    <section tabIndex={0} onMouseMove={handleMouseMove} onKeyPress={handleKeyPress} style={{backgroundColor: `rgb(255, ${255-(anger/25)}, ${255-(anger/25)})`}}>
      <div style={{maxWidth: `${(anger/20)+25}%`, fontSize: `${anger/50+10}px`, letterSpacing: `${(anger/250)+1}px`, transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`}}>{text}</div>
    </section>
  );
}

export default App;
