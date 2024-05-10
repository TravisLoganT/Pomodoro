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

	const handleMinuteChange = (event) => {
		const newMinutes = Math.max(0, parseInt(event.target.value, 10));
		if (!isActive) {
			setMinutes(newMinutes);
		}
	};

	const handleSecondChange = (event) => {
		const newSeconds = Math.max(0, parseInt(event.target.value, 10));
		newSeconds = Math.min(59, newSeconds);
		if (!isActive) {
			setSeconds(newSeconds);
		}
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
				{!isActive ? (
					<>
						<input
							type="number"
							value={minutes}
							onChange={handleMinuteChange}
							min="0"
							style={{ width: "60px" }}
						/>
						:
						<input
							type="number"
							value={seconds}
							onChange={handleSecondChange}
							min="00"
							max="59"
							style={{ width: "60px" }}
						/>
					</>
				) : (
					<p>{formatTime(minutes)}:{formatTime(seconds)}</p>
				)}
			</div>
			<div className="start-stop">
				<button onClick={toggleTimer}>{isActive ? "Stop" : "Start"}</button>
			</div>
		</div>
	);
};
