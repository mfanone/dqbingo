import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// Styles
import './sass/main.scss';
// Custom Components
import BingoGame from './components/BingoGame.js';
import CardGenerator from './components/pages/CardGenerator.js';
import Help from './components/pages/Help.js';
import Patterns from './components/pages/Patterns.js';
import Settings from './components/pages/Settings.js';

function App() {
	const [menuOpen, setMenuOpen] = useState(false);
	const closeMenu = () => setMenuOpen(false);

	return (
		<Router basename={process.env.PUBLIC_URL}>
			<header>
				<div className="container row align-center justify-end">
					<div className="col shrink">
						<button
							className="menu-toggle"
							onClick={() => setMenuOpen(!menuOpen)}
							aria-label="Toggle menu"
							aria-expanded={menuOpen}
						>
							<span></span>
							<span></span>
							<span></span>
						</button>
					</div>
				</div>
				<nav className={menuOpen ? 'site-menu open' : 'site-menu'}>
					<ul className="menu">
						<li>
							<Link to="/" onClick={closeMenu}>
								Play
							</Link>
						</li>
						<li>
							<Link to="/generator" onClick={closeMenu}>
								Cards
							</Link>
						</li>
						<li>
							<Link to="/settings" onClick={closeMenu}>
								Settings
							</Link>
						</li>
						<li>
							<Link to="/help" onClick={closeMenu}>
								Help
							</Link>
						</li>
					</ul>
				</nav>
			</header>

			<Route exact path="/" component={BingoGame} />
			<Route path="/generator" component={CardGenerator} />
			<Route path="/patterns" component={Patterns} />
			<Route path="/settings" component={Settings} />
			<Route path="/help" component={Help} />
		</Router>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
