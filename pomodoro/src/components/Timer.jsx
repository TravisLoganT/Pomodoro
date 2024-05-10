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

	const handleMinutesChange = (event) => {
		const newValue = event.target.value.replace(/[^0-9]/g, "");
		setMinutes(newValue);
	};

	const handleSecondsChange = (event) => {
		const newValue = event.target.value.replace(/[^0-9]/g, "");
		setSeconds(newValue);
	};

	useEffect(() => {
		let interval = null;
		if (isActive) {
			interval = setInterval(() => {
				decrementTime();
			}, 1000);
		} else if (!isActive) {
			setMinutes(formatTime(parseInt(minutes, 10) || 0));
			setSeconds(formatTime(parseInt(seconds, 10) || 0));
		}
		return () => clearInterval(interval);
	}, [decrementTime, isActive, minutes, seconds]);

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
							onChange={handleMinutesChange}
							disabled={isActive}
						/>
						:
						<input
							className="input-seconds"
							type="text"
							value={seconds}
							onChange={handleSecondsChange}
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
