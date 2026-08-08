import React from 'react';
import { Link } from 'react-router-dom';

class Help extends React.Component {
	componentDidMount() {
		document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener('click', function (e) {
				e.preventDefault();

				document.querySelector(this.getAttribute('href')).scrollIntoView({
					behavior: 'smooth',
				});
			});
		});
	}

	render() {
		return (
			<section className="padding-vertical-xxlg">
				<div className="container row">
					<div id="top" className="col">
						<div className="back-to-top">
							<a href="#top">&#10094;</a>
						</div>
						<div className="title no-margin">Instructions for Drag Queen Bingo</div>

						{/* --------------- Table of Contents --------------- */}
						<p>Please use the links below to guide you in your gameplay!</p>
						<ol>
							<li>
								<a href="#gameplay">How do I play?</a>
								<ul className="no-margin padding-left-xlg">
									<li>
										<a href="#game-setup">Game Setup</a>
									</li>
									<li>
										<a href="#pattern-selection">Pattern Selection</a>
									</li>
									<li>
										<a href="#gameplay-buttons">Gameplay Buttons</a>
									</li>
									<li>
										<a href="#audible-chime">Audible Chime</a>
									</li>
									<li>
										<a href="#game-modes">Game Modes</a>
									</li>
								</ul>
							</li>
							<li>
								<a href="#troubleshooting">Troubleshooting</a>
							</li>
							<li>
								<a href="#reporting-issues">Reporting Issues</a>
							</li>
							<li>
								<a href="#contact">Questions, Suggestions, Comments</a>
							</li>
						</ol>

						{/* --------------- Game Play --------------- */}
						<h1 id="gameplay">How do I play?</h1>
						<p>
							If you have ever played Bingo before, this application should be
							pretty self explanatory. I've done my best to mimic what you
							experience in the bingo halls as closely as possible. If you still
							need help, please reference the guide below for how to use this
							app for hosting your own bingo games!
						</p>

						{/* <section className="margin-top-xxlg padding-top-sm pale-gray-bg"></section> */}

						<h2 id="game-setup">Game Setup</h2>
						<p>
							First choose someone to be the caller/controller of the game
							board. This person will manage game settings, handle calling the
							numbers, and reset the game as necessary when someone calls bingo.
						</p>
						<p>
							Choose what settings you wish to play with using the{' '}
							<button
								className="link-button"
								onClick={this.props.onOpenSettings}
							>
								Settings
							</button>{' '}
							icon in the header. You can learn more about the available game
							modes by reviewing the{' '}
							<a href="#game-modes">game modes</a> section below.
						</p>
						<p>
							Once players have their cards, the caller should share their
							screen so all players can see the board. Consider mirroring your
							screen to a television or other display by using a device such as
							ChromeCast, AppleTV, Roku, etc.
						</p>
						<p>
							If playing virtually, use the screen share option available in
							your meeting application of choice. Examples of apps to use
							include Zoom, Google Meet, Microsoft Teams, Skype, etc. Please
							refer to the application's documentation for how to share your
							screen in that particular app.
						</p>

						{/* <section className="margin-top-xxlg padding-top-sm pale-gray-bg"></section> */}

						<h2 id="pattern-selection">Game Pattern Selection</h2>
						<p>
							On the left side of the caller is a bingo card display that can be
							used to show players what pattern they should be trying to match
							for the current bingo game.
						</p>
						<p>
							You can choose a preset pattern in the dropdown below the display
							(you can type in the dropdown to search!) OR you can click on the
							individual spaces on the bingo card to create your own custom
							pattern!
						</p>
						<p>
							<strong>"Crazy" Patterns</strong> - Any pattern that starts with
							the word "Crazy" means it can be played in any direction on the
							card.
						</p>
						<p>
							<strong>Pattern Listing</strong> you can{' '}
							<Link to="/patterns" onClick={this.props.onClose}>view all of the patterns</Link>, and print them
							at <Link to="/patterns" onClick={this.props.onClose}>/patterns</Link>!
						</p>

						{/* <section className="margin-top-xxlg padding-top-sm pale-gray-bg"></section> */}

						<h2 id="gameplay-buttons">Gameplay Buttons</h2>
						<p>
							<strong>Start New Game</strong> - this button only appears when
							there is not an active game in play. Clicking this button will
							start a brand new game by calling a single random bingo number (or
							all of the wild numbers if playing Wild Bingo).
						</p>
						<p>
							<strong>Call Next Number</strong> - this button only appears if a
							game is in play. Clicking this button will call the next number
							and display it as flashing on the board.
						</p>
						<p>
							<strong>Reset Board</strong> - this button is always available.
							Clicking this button will show a pop up asking you if you're sure
							you want to reset the board. Confirming will play a quick shuffle
							animation (with sound, if Audible Shuffle is enabled) before
							wiping out the current game completely, so use with caution.
						</p>


						{/* --------------- Audible Chime --------------- */}
						<h1 id="audible-chime">Audible Chime</h1>
						<p>
							With this setting a subtle chime is played before each number is
							called to alert the players that it's time to mark the next
							number.
						</p>
						<p>
							When enabled you will see a list of chimes to choose from. When
							you select a chime it will play a sample of the selection.
						</p>
						<p className="small-text">
							<strong>Note:</strong> The <strong>Audible Shuffle</strong> toggle
							below it controls whether a shuffle sound plays when you reset the
							board. It is disabled by default.
						</p>


						{/* --------------- GAME MODES --------------- */}
						<h1 id="game-modes">Game Modes</h1>
						<h2>Skip Unused Numbers</h2>
						<p>
							This game mode when used in combination with selecting a pattern
							will skip any numbers beginning with a letter who's column is not
							being used in the pattern. <em>For example:</em> When playing the
							Small Picture Frame it will skip Bs and Os.
						</p>
						<p className="small-text">
							<strong>Note:</strong> it will still display the numbers on the
							board as if they were called, but it will mark them as called and
							skip past them to call a new ball. No numbers are skipped in
							patterns that begin with the word Crazy because they are expected
							to be played in any direction.
						</p>

						{/* <section className="margin-top-xxlg padding-top-sm pale-gray-bg"></section> */}

						<h2>Wild Bingo</h2>
						<p>
							Wild Bingo indicates that the first number called is wild, meaning
							you would mark every number ending in the same digit as the wild
							bingo number. <em>For Example:</em> If the wild number is G56, you
							would mark every number ending in 6. This game mode can be used on
							any pattern.
						</p>

						<h3>Wild Bingo: Evens/Odds</h3>
						<p>
							This mode is a sub-type for Wild Bingo. Just like wild bingo - the
							first number called is wild. However, in this game mode, you'd
							mark all even or all odd numbers depending on if the wild number
							is even or odd.
						</p>


						<h1 id="troubleshooting">Troubleshooting</h1>
						<p>
							Having issues? Before sending a message please go through these
							steps that will normally resolve any issues.
						</p>

						<h3 className="no-margin">Clear your cache.</h3>
						<p className="margin-top-none">
							This simple step can usually solve most issues. If you are unsure
							of how to clear your cache here is a{' '}
							<a
								href="https://kinsta.com/knowledgebase/how-to-clear-browser-cache/"
								target="_blank"
								rel="noreferrer"
							>
								very detailed article
							</a>{' '}
							that should help you.
						</p>

						<h3 className="no-margin">Check your game settings</h3>
						<p className="margin-top-none">
							Double check your settings to ensure that you're not inadvertently
							disabling functionality. <em>For example</em>, if you have skip
							unused numbers enabled and have a blank pattern then call a
							number it'll call all numbers.
						</p>

						<h3 className="no-margin">Try a different browser</h3>
						<p className="margin-top-none">
							To rule out issues with the site itself, try a different browser
							and see if the issues persist.
						</p>
					</div>
				</div>
			</section>
		);
	}
}
export default Help;
