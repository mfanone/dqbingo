import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Styles
import './sass/main.scss';
// Custom Components
import BingoGame from './components/BingoGame.js';
import Help from './components/pages/Help.js';
import Patterns from './components/pages/Patterns.js';
import Settings from './components/pages/Settings.js';
import FloatingPanel from './components/subcomponents/FloatingPanel.js';
import FullscreenIcon from './components/subcomponents/icons/FullscreenIcon.js';
import GearIcon from './components/subcomponents/icons/GearIcon.js';
import HelpIcon from './components/subcomponents/icons/HelpIcon.js';

function App() {
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [helpOpen, setHelpOpen] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);

	const closeSettings = () => setSettingsOpen(false);
	const closeHelp = () => setHelpOpen(false);
	const openSettingsFromHelp = () => {
		setHelpOpen(false);
		setSettingsOpen(true);
	};

	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(
				Boolean(document.fullscreenElement || document.webkitFullscreenElement)
			);
		};
		document.addEventListener('fullscreenchange', handleFullscreenChange);
		document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
			document.removeEventListener(
				'webkitfullscreenchange',
				handleFullscreenChange
			);
		};
	}, []);

	const toggleFullscreen = () => {
		const fullscreenElement =
			document.fullscreenElement || document.webkitFullscreenElement;
		if (fullscreenElement) {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		} else {
			const el = document.documentElement;
			if (el.requestFullscreen) {
				el.requestFullscreen();
			} else if (el.webkitRequestFullscreen) {
				el.webkitRequestFullscreen();
			}
		}
	};

	return (
		<Router basename={process.env.PUBLIC_URL}>
			<header>
				<div className="container row align-center justify-end">
					<div className="col shrink">
						<button
							className="icon-btn"
							onClick={toggleFullscreen}
							aria-label={isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
						>
							<FullscreenIcon active={isFullscreen} />
						</button>
					</div>
					<div className="col shrink">
						<button
							className="icon-btn"
							onClick={() => setSettingsOpen(true)}
							aria-label="Settings"
						>
							<GearIcon />
						</button>
					</div>
					<div className="col shrink">
						<button
							className="icon-btn"
							onClick={() => setHelpOpen(true)}
							aria-label="Help"
						>
							<HelpIcon />
						</button>
					</div>
				</div>
			</header>

			<Route exact path="/" component={BingoGame} />
			<Route path="/patterns" component={Patterns} />

			{settingsOpen && (
				<FloatingPanel title="Settings" onClose={closeSettings}>
					<Settings onClose={closeSettings} />
				</FloatingPanel>
			)}
			{helpOpen && (
				<FloatingPanel title="Help" onClose={closeHelp}>
					<Help onOpenSettings={openSettingsFromHelp} />
				</FloatingPanel>
			)}
		</Router>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
