import "./App.css";
import scream from "./assets/screamSegment.wav";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const audioElement = new Audio(scream);

function App() {
	const [anger, setAnger] = useState(0);
	const [text, setText] = useState("");
	const [scale, setScale] = useState(1.1);
	const [translateX, setTranslateX] = useState(0);
	const [translateY, setTranslateY] = useState(0);
	let timer;

	useEffect(() => {
		timer =
			!timer &&
			setInterval(() => {
				setAnger((prevState) =>
					prevState > 0 ? prevState - (anger / 100 + 1) : 0
				);
				setText((prevState) =>
					prevState
						? prevState.slice(
								0,
								prevState.length - (anger / 100 + 1)
						  )
						: ""
				);
				console.log(anger);
			}, 50);
		return () => clearInterval(timer);
	}, [anger, text]);

	const handleMouseMove = (e) => {
		const movementValue = Math.floor(
			Math.abs(e.movementX / 50) + Math.abs(e.movementY / 50)
		);
		let textAddition = "";
		for (let i = 0; i < Math.floor(movementValue); i++) {
			textAddition += "A";
		}
		setScale(
			1.1 + Math.random() * (movementValue / 75) - movementValue / 75
		);
		setTranslateX(
			Math.random() * (movementValue - movementValue + anger / 50)
		);
		setTranslateY(
			Math.random() * (movementValue - movementValue + anger / 50)
		);
		setAnger((prevState) => prevState + movementValue);
		setText((prevState) => prevState + textAddition);
	};

	const handleKeyPress = (e) => {
		const value = Math.ceil(Math.random() * 10);
		let textAddition = "";
		for (let i = 0; i < value; i++) {
			textAddition += "A";
		}
		setAnger((prevState) => prevState + value);
		setText((prevState) => prevState + textAddition);
	};

	return (
		<>
      <Helmet>
        <title>{(anger < 100) ? 'yellRoom' : text.slice(0, anger/100)}</title>
      </Helmet>
			<section
				tabIndex={0}
				onMouseMove={handleMouseMove}
				onKeyPress={handleKeyPress}
				style={{
					backgroundColor: `rgb(255, ${255 - anger / 25}, ${
						255 - anger / 25
					})`,
				}}>
				<div
					style={{
						maxWidth: `${anger / 20 + 25}%`,
						fontSize: `${anger / 50 + 10}px`,
						letterSpacing: `${anger / 250 + 1}px`,
						transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
					}}>
					{text}
				</div>
			</section>
		</>
	);
}

export default App;
