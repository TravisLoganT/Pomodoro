import { React, useEffect, useState } from "react";
import "./Timer.css";

export const Timer = () => {
	const [minutes, setMinutes] = useState("25");
	const [seconds, setSeconds] = useState("00");
	const [isActive, setIsActive] = useState(false);

	const decrementTime = () => {
		let intMinutes = parseInt(minutes, 10);
		let intSeconds = parseInt(seconds, 10);

		if (intSeconds > 0) {
			setSeconds(formatTime(intSeconds - 1));
		} else if (intMinutes > 0 && intSeconds === 0) {
			setMinutes(formatTime(intMinutes - 1));
			setSeconds("59");
		} else if (intMinutes === 0 && intSeconds === 0) {
			setIsActive(false);
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
		const newValue = event.target.value;
		setSeconds(validateTime(newValue, 59));
	};

	const handleSecondChange = (event) => {
		const newValue = event.target.value;
		setSeconds(validateTime(newValue, 59));
	};

	const validateTime = (value, max) => {
		let num = parseInt(value, 10);
		if (isNaN(num) || num < 0) {
			return "00";
		} else if (num > max) {
			return formatTime(max);
		} else {
			return formatTime(num);
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
	}, [decrementTime, isActive, seconds]);

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
							className="input-minutes"
							type="text"
							value={minutes}
							onChange={handleMinuteChange}
							min="0"
							disabled={isActive}
						/>
						:
						<input
							className="input-seconds"
							type="text"
							value={seconds}
							onChange={handleSecondChange}
							min="00"
							max="59"
							disabled={isActive}
						/>
					</>
				) : (
					<p>
						{formatTime(minutes)}:{formatTime(seconds)}
					</p>
				)}
			</div>
			<div className="start-stop">
				<button onClick={toggleTimer}>{isActive ? "Stop" : "Start"}</button>
			</div>
		</div>
	);
};
