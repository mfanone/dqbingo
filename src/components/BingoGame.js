/*
 * Let's Play Bingo
 * Version 3.0
 * App written by Karol Brennan
 * https://karol.dev
 * http://github.com/karolbrennan
 */
// Dependencies
import React, { Component } from 'react';
import Select from 'react-select';

// Custom Components
import BingoBoard from './subcomponents/BingoBoard.js';
import Pattern from './subcomponents/Pattern.js';
import CallHistory from './subcomponents/CallHistory.js';

// Images
import logo from '../images/dqb-graphic.png';

// Utilities
import {
	generateBingoBoard,
	getRandomBingoNumber,
	getPresetPatterns,
	getBallDisplay,
	getLogoBallDisplay,
	loadSettings,
} from '../utils.js';

// Chimes
import { shuffle } from '../chimes';
class BingoGame extends Component {
	constructor(props) {
		super(props);
		// -------------------------- Set properties ----- //
		// Balls display pieces
		this.totalBallsCalled = 0;
		this.previousBall = null;
		this.currentBall = null;
		this.shuffleSound = shuffle;

		// Patterns
		this.patternPlaceholder = 'Choose a pattern';
		this.presets = getPresetPatterns();

		let gameData = JSON.parse(localStorage.getItem('lpb-gameData'));
		let gameState = JSON.parse(localStorage.getItem('lpb-gameState'));
		let settings = loadSettings();

		if (gameData && gameState) {
			for (let key in gameData) {
				this[key] = gameData[key];
			}
			this.state = { ...gameState, ...settings };
		} else {
			// Set initial state
			this.state = { ...this.getInitialStateData(), ...settings };
		}
	}

	getInitialStateData() {
		return {
			board: generateBingoBoard(),
			previousCallList: [],
			selectedPattern: {
				value: this.patternPlaceholder,
				label: this.patternPlaceholder,
				pattern: {
					B: [false, false, false, false, false],
					I: [false, false, false, false, false],
					N: [false, false, false, false, false],
					G: [false, false, false, false, false],
					O: [false, false, false, false, false],
				},
			},
			showResetModal: false,
		};
	}

	/**
	 * In case of going from one page to another, when we return
	 * and the component has mounted reinitialize the game from
	 * local storage.
	 *
	 */
	componentDidMount() {
		// ensure the reset modal doesn't show at initial load
		this.setState({ showResetModal: false });
	}

	/**
	 * [componentDidUpdate description]
	 *
	 * @param   {[type]}  prevProps  [prevProps description]
	 * @param   {[type]}  state      [state description]
	 *
	 * @return  {[type]}             [return description]
	 */
	componentDidUpdate(prevProps, state) {
		let gameData = {
			totalBallsCalled: this.totalBallsCalled,
			previousBall: this.previousBall,
			currentBall: this.currentBall,
		};
		localStorage.setItem('lpb-gameData', JSON.stringify(gameData));
		localStorage.setItem('lpb-gameState', JSON.stringify(this.state));
	}

	/**
	 * [initializeFromLocalStorage description]
	 *
	 * @return  {[type]}  [return description]
	 */
	initializeFromLocalStorage = () => {
		let gameData = JSON.parse(localStorage.getItem('lpb-gameData'));
		let gameState = JSON.parse(localStorage.getItem('lpb-gameState'));
		if (gameData && gameState) {
			for (let key in gameData) {
				this[key] = gameData[key];
			}
			this.setState(...gameState);
		}
	};

	/* ------------------- Gameplay Functions */

	startNewGame = () => {
		// Obtain all randomized balls
		let byteArray = new Uint8Array(1);
		let randomVals = [];

		while (randomVals.length < 75) {
			let randomVal = window.crypto.getRandomValues(byteArray)[0];
			if (randomVal > 0 && randomVal <= 75 && !randomVals.includes(randomVal)) {
				randomVals.push(randomVal);
			}
		}

		if (this.state.wildBingo) {
			this.startWildBingo();
		} else {
			this.callBingoNumber();
		}
	};

	startWildBingo = () => {
		// Variables used for wild bingo
		let randomBingoNumber = getRandomBingoNumber();
		let wildNumber = randomBingoNumber.toString().slice(-1);
		let odd = wildNumber % 2 === 1;
		let wildBall = null;
		let lastBall = null;
		let board = this.state.board;
		let totalBallsCalled = this.totalBallsCalled;
		let previousCallList =
			this.state.previousCallList.length > 0
				? [...this.state.previousCallList]
				: [];

		Object.keys(board).forEach((letter) => {
			board[letter].forEach((number) => {
				if (!number.called) {
					if (number.number === randomBingoNumber) {
						this.setState({ wildBall: letter + ' ' + randomBingoNumber });
						number.called = true;
						number.active = true;
						wildBall = number;
						totalBallsCalled++;
						previousCallList.push(number);
					} else if (
						!this.state.evensOdds &&
						number.number.toString().slice(-1) === wildNumber
					) {
						lastBall = number;
						number.called = true;
						totalBallsCalled++;
						previousCallList.push(number);
					} else if (
						this.state.evensOdds &&
						(number.number % 2 === 1) === odd
					) {
						lastBall = number;
						number.called = true;
						totalBallsCalled++;
						previousCallList.push(number);
					}
				}
				return number;
			});
			return letter;
		});

		this.totalBallsCalled = totalBallsCalled;
		this.previousBall = lastBall;
		this.currentBall = wildBall;
		this.setState({ board: board, previousCallList: [...previousCallList] });
	};

	toggleResetModal = () => {
		const currentState = this.state.showResetModal;
		this.setState({ showResetModal: !currentState });
	};

	confirmResetGame = () => {
		this.setState({ showResetModal: false });

		// Shuffle animation and sound before the board actually resets
		let balls = generateBingoBoard();
		let letters = ['B', 'I', 'N', 'G', 'O'];
		let sound = new Audio(this.shuffleSound);
		let duration = 1500;
		for (let i = 0; i <= duration; i++) {
			window.setTimeout(() => {
				if (i === 0 && this.state.audibleShuffle) {
					sound.play();
				}
				if (i > 0 && i <= duration) {
					flashRandomBall();
					this.setState({ board: balls });
				}
				if (i === duration) {
					if (this.state.audibleShuffle) {
						sound.pause();
					}
					this.resetGame();
				}
			}, duration);
		}

		function flashRandomBall() {
			let randomLetter = letters[Math.floor(Math.random() * 5)];
			let randomNumber = Math.floor(Math.random() * 15);
			Object.keys(balls).forEach((letter) => {
				Object.values(balls[letter]).forEach((ball) => {
					if (ball.letter === randomLetter) {
						balls[randomLetter][randomNumber].active =
							!balls[randomLetter][randomNumber].active;
						balls[randomLetter][randomNumber].called =
							!balls[randomLetter][randomNumber].called;
					}
					return ball;
				});
			});
		}
	};

	resetGame = () => {
		// Clear out local storage
		localStorage.removeItem('lpb-gameData');
		localStorage.removeItem('lpb-gameState');
		// reset everything with the board
		this.totalBallsCalled = 0;
		this.previousBall = null;
		this.currentBall = null;
		this.setState({
			board: generateBingoBoard(),
			wildBall: null,
			previousCallList: [],
		});
	};

	callBingoNumber = () => {
		let totalBallsCalled = this.totalBallsCalled;
		let selectedPattern = this.state.selectedPattern;
		let totalPossibleBalls = 75;
		if (
			this.state.skipUnused === true &&
			selectedPattern.value !== this.patternPlaceholder
		) {
			totalPossibleBalls = 75 - selectedPattern.unusedLetters.length * 15;
		}
		if (totalBallsCalled < totalPossibleBalls) {
			let board = this.state.board;
			let currentBall = null;
			let previousBall = this.currentBall;
			let randomBingoNumber = getRandomBingoNumber();
			let callAgain = false;
			let updateState = false;
			let previousCallList = [...this.state.previousCallList];

			// Map through the letters on the board
			Object.keys(board).map((letter) => {
				// Map through each number 1-15 under each letter on the board
				board[letter].map((number) => {
					// automatically set the number as not active (this will clear any previously active numbers)
					number.active = false;
					// If this is the match to the random number we called, do logic
					if (number.number === randomBingoNumber) {
						// if the number was not called, do logic. Else call again
						if (!number.called) {
							// set to called and add to previously called numbers
							number.called = true;
							previousCallList.push(number);

							currentBall = number;
							// if we are skipping unused numbers, a pattern has been selected, and this letter is not in use, we want to call a new number when
							// we are done here.
							if (
								this.state.skipUnused &&
								selectedPattern.value !== this.patternPlaceholder &&
								selectedPattern.unusedLetters.indexOf(letter) >= 0
							) {
								callAgain = true;
							} else {
								// increment the total balls called.
								totalBallsCalled++;
								// set ball to active since we won't be calling again
								number.active = true;

								//If chime is enabled, play the chime
								if (this.state.chime) {
									let chime = new Audio(this.state.selectedChime.value);
									chime.play();
								}
							}
							updateState = true;
							this.totalBallsCalled = totalBallsCalled;
						} else {
							// call again cause we got a ball we already called
							callAgain = true;
						}
					}
					return number;
				});
				return letter;
			});

			if (updateState) {
				this.previousBall = previousBall;
				this.currentBall = currentBall;
				this.setState({ board: board, previousCallList: previousCallList });
			}
			if (callAgain && totalBallsCalled < 75) {
				this.callBingoNumber();
			}
		} else {
			this.totalBallsCalled = totalPossibleBalls;
			this.previousBall = this.currentBall;
			this.currentBall = null;
			this.forceUpdate();
		}
	};

	/* ------------------ Handlers */
	handleUpdatePattern = (pattern, letter, index, slot) => {
		pattern[letter][index] = !slot;
		let unusedLetters = [];
		Object.keys(pattern).map((letter) => {
			// Check for free space ONLY first. If it's not the letter N, check for any used spaces.
			if (letter === 'N') {
				let markedSpaces = [];
				// loop through each space in the pattern for the letter N
				pattern[letter].forEach((space, index) => {
					// if the space is marked, push the index of the space into markedSpaces array
					if (space) {
						markedSpaces.push(index);
					}
				});
				// if no spaces are marked, OR ONLY the free space is marked - push N to unused letters.
				if (
					markedSpaces.length === 0 ||
					(markedSpaces.length === 1 && markedSpaces[0] === 2)
				) {
					unusedLetters.push(letter);
				}
			} else {
				if (pattern[letter].indexOf(true) < 0) {
					unusedLetters.push(letter);
				}
			}
			return letter;
		});
		let customPattern = {
			value: 'Custom',
			label: 'Custom',
			unusedLetters: unusedLetters,
			pattern: pattern,
		};
		this.setState({ selectedPattern: customPattern });
	};

	/* ------------------- JSX Display Functions */

	/**
	 * Returns a JSX element to display the current ball
	 *
	 * @return  {JSX}  JSX Element
	 */
	get currentBallDisplay() {
		return this.currentBall !== null
			? getBallDisplay(this.currentBall)
			: getLogoBallDisplay();
	}

	/**
	 * Get Number Display shown above the pattern display
	 *
	 * @return  {JSX}  html element
	 */
	get numberDisplay() {
		let numbers = this.totalBallsCalled.toString().split('');
		if (numbers.length === 1) {
			return (
				<div>
					<span>&nbsp;</span>
					<span>{numbers[0]}</span>
				</div>
			);
		} else {
			return numbers.map((number, index) => (
				<span key={'numDisplay' + number + index}>{number}</span>
			));
		}
	}

	/**
	 * Get the current call display
	 *
	 * @return  {JSX}  html element
	 */
	get currentCallDisplay() {
		const currentCall = this.currentBall;
		if (currentCall) {
			let numbers = ['0'];
			if (Object.prototype.hasOwnProperty.call(currentCall, 'number')) {
				numbers = currentCall.number.toString().split('');
			}
			if (numbers.length === 1) {
				return (
					<div>
						<span>&nbsp;</span>
						<span>{numbers[0]}</span>
					</div>
				);
			} else {
				return numbers.map((number, index) => (
					<span key={'call' + number + index}>{number}</span>
				));
			}
		} else {
			return (
				<div>
					<span>&nbsp;</span>
					<span>&nbsp;</span>
				</div>
			);
		}
	}

	/**
	 * Get the previous call display
	 *
	 * @return  {JSX}  html element
	 */
	get previousCallDisplay() {
		const previousCall = this.previousBall;
		if (previousCall) {
			let numbers = ['0'];
			if (Object.prototype.hasOwnProperty.call(previousCall, 'number')) {
				numbers = previousCall.number.toString().split('');
			}
			if (numbers.length === 1) {
				return (
					<div>
						<span>&nbsp;</span>
						<span>{numbers[0]}</span>
					</div>
				);
			} else {
				return numbers.map((number, index) => (
					<span key={'call' + number + index}>{number}</span>
				));
			}
		} else {
			return (
				<div>
					<span>&nbsp;</span>
					<span>&nbsp;</span>
				</div>
			);
		}
	}

	/**
	 * Reset confirmation modal display
	 *
	 * @return  {[JSX]}  Return modal or empty div
	 */
	get resetConfirmationModalDisplay() {
		if (this.state.showResetModal === true) {
			return (
				<div>
					<div className="modal reset-modal">
						<h4>Reset Game</h4>
						<p>Are you sure you want to reset the game?</p>
						<p className="red-text">
							This action <strong>cannot</strong> be undone.
						</p>
						<p>
							<button className="altBtn" onClick={this.toggleResetModal}>CANCEL</button>
							<button className="primaryBtn" onClick={this.confirmResetGame}>
								CONFIRM
							</button>
						</p>
					</div>
					<div
						className="modal-backdrop"
						onClick={(e) => {
							e.preventDefault();
						}}
					></div>
				</div>
			);
		} else {
			return null;
		}
	}

	/* ------------------- Render */
	render() {
		return (
			<div className="dark-bg light-links">
				{/* ----------- Bingo Board ------------- */}
				<section className="board-block">
					<div className="container row no-wrap align-stretch">
						{/* ------ Board ------- */}
						<div className="col pattern-side shrink padding-xlg">
							{/* -------- Logo --------- */}
							<div className="row justify-center margin-bottom-lg">
								<div className="logo-chip">
									<img src={logo} alt="Drag Queen Bingo" className="logo" />
								</div>
							</div>

							{/* -------- Digital Displays --------- */}
							<div className="row no-wrap margin-bottom-lg justify-space-between white-text">
								<div className="col text-center margin-sm">
									<div className="callNumber">
										{this.numberDisplay}
									</div>
									<div className="callNumber-text uppercase">Calls</div>
								</div>
								<div className="col text-center margin-sm">
									<div className="callNumber">
										{this.previousCallDisplay}
									</div>
									<div className="callNumber-text uppercase">Previous</div>
								</div>
							</div>

							{/* -------- Pattern --------- */}
							<Pattern
								pattern={this.state.selectedPattern}
								update={this.handleUpdatePattern}
								disabled={this.totalBallsCalled > 0}
							/>
							<div className="padding-vertical-lg">
								<Select
									className="pattern-select"
									placeholder="Choose Pattern"
									value={this.state.selectedPattern}
									onChange={(e) => {
										this.setState({ selectedPattern: e });
									}}
									options={this.presets}
									isDisabled={this.totalBallsCalled > 0}
								/>
							</div>
						</div>
						<div className="col board-side">
							<BingoBoard board={this.state.board} />
						</div>
					</div>
				</section>

				{/* ----------- BOTTOM SECTION ------------- */}
				<section className="game-controls dark-bg">
					<div className="container row align-start">
						{/* ----------- Gameplay Controls ------------- */}
						<div className="col shrink padding-vertical-xxlg padding-horizontal-md">
							<section className="gameplay-controls">
								<div data-disabled={this.totalBallsCalled >= 75}>
									<button
										onClick={
											this.totalBallsCalled === 0
												? this.startNewGame
												: this.callBingoNumber
										}
									>
										NEXT NUMBER
									</button>
								</div>

								<button onClick={this.toggleResetModal}>RESET BOARD</button>
							</section>
							{this.resetConfirmationModalDisplay}
						</div>

						{/* ----------- Current Ball Display ------------- */}
						<div className="col grow min-size-250 padding-vertical-xxlg padding-horizontal-md">
							<div className="row no-wrap ball-history-row">
								<div className="col shrink current-ball-wrap">
									{this.currentBallDisplay}
									<div className="text-center current-call-label uppercase x-small-text">
										Current Call
									</div>
								</div>
								<div className="col grow call-history-wrap">
									<CallHistory
										calledBalls={this.state.previousCallList}
									></CallHistory>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default BingoGame;
