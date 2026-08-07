import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// Styles
import './sass/main.scss';
// Images
import logo from './images/logo.svg';
// Custom Components
import BingoGame from './components/BingoGame.js';
import CardGenerator from './components/pages/CardGenerator.js';
import Help from './components/pages/Help.js';
import Patterns from './components/pages/Patterns.js';
import Settings from './components/pages/Settings.js';

const routing = (
	<Router>
		<header>
			<div className="container row align-center">
				<div className="col shrink">
					<Link to="/">
						<img src={logo} alt="Let's Play Bingo!" className="logo" />
					</Link>
				</div>
				<div className="col grow padding-md no-text-wrap text-right">
					<ul className="menu">
						<li>
							<Link to="/">Play</Link>
						</li>
						<li>
							<Link to="/generator">Cards</Link>
						</li>
						<li>
							<Link to="/settings">Settings</Link>
						</li>
						<li>
							<Link to="/help">Help</Link>
						</li>
					</ul>
				</div>
			</div>
		</header>

		<Route exact path="/" component={BingoGame} />
		<Route path="/generator" component={CardGenerator} />
		<Route path="/patterns" component={Patterns} />
		<Route path="/settings" component={Settings} />
		<Route path="/help" component={Help} />
	</Router>
);
ReactDOM.render(routing, document.getElementById('root'));
