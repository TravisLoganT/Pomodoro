import { React, useEffect, useState } from "react";
import "./Timer.css";

export const Timer = () => {
	const [minutes, setMinutes] = useState(25);
	const [seconds, setSeconds] = useState(0);
	const [isActive, setIsActive] = useState(false);

	const decrementTime = () => {
		if (seconds > 0) {
			setSeconds(seconds - 1);
		} else if (minutes > 0 && seconds === 0) {
			setMinutes(minutes - 1);
			setSeconds(59);
		}
	};

	const formatTime = (time) => {
		return time.toString().padStart(2, "0");
	};

	const toggleTimer = () => {
		setIsActive(!isActive);
	};

	const setTime = (mins) => {
		setMinutes(mins);
		setSeconds(0);
		setIsActive(false);
	};

	useEffect(() => {
		let interval = null;
		if (isActive) {
			interval = setInterval(() => {
				decrementTime();
			}, 1000);
		} else if (!isActive && seconds !== 0) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [isActive, seconds]);

	return (
		<div className="timer-container">
			<div className="option-selection">
				<div className="option">
					<button onClick={() => setTime(25)}>Pomodoro</button>
				</div>
				<div className="option">
					<button onClick={() => setTime(5)}>Short Break</button>
				</div>
				<div className="option">
					<button onClick={() => setTime(15)}>Long Break</button>
				</div>
			</div>
			<div className="timer">
				<p>
					{formatTime(minutes)}:{formatTime(seconds)}
				</p>
			</div>
			<div className="start-stop">
				<button onClick={toggleTimer}>{isActive ? "Stop" : "Start"}</button>
			</div>
		</div>
	);
};
