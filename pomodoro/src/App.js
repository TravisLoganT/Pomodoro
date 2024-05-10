import logo from "./logo.svg";
import "./App.css";
import { Timer } from "./components/Timer";

function App() {
	return (
		<>
			<div className="header">
				<div className="title">
					<p>Pomodoro Pulse</p>
				</div>
				<div classname="settings-tab">
					<p>Settings</p>
				</div>
				<div className="account-login">
					<p>Account</p>
				</div>
			</div>

			<Timer />
		</>
	);
}

export default App;
