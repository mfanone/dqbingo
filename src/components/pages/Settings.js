import React from 'react';
import Select from 'react-select';
import { getChimeOptions, loadSettings, saveSettings } from '../../utils.js';

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.chimes = getChimeOptions();
		this.state = loadSettings();

		let gameData = JSON.parse(localStorage.getItem('lpb-gameData'));
		this.gameInProgress = Boolean(gameData && gameData.totalBallsCalled > 0);
	}

	handleCheckbox = (e) => {
		let gamemode = e.currentTarget.dataset.gamemode;
		let updated = { ...this.state };
		switch (gamemode) {
			case 'skip-unused':
				updated.skipUnused = e.currentTarget.checked;
				break;
			case 'wild-bingo':
				updated.wildBingo = e.currentTarget.checked;
				break;
			case 'evens-odds':
				updated.evensOdds = e.currentTarget.checked;
				break;
			case 'enable-chime':
				updated.chime = e.currentTarget.checked;
				break;
			case 'enable-shuffle-sound':
				updated.audibleShuffle = e.currentTarget.checked;
				break;
			default:
				break;
		}
		this.setState(updated);
		saveSettings(updated);
	};

	handleChooseChime = (e) => {
		let chime = new Audio(e.value);
		chime.play();
		let updated = { ...this.state, selectedChime: e };
		this.setState(updated);
		saveSettings(updated);
	};

	render() {
		return (
			<section className="padding-vertical-xxlg settings-page">
				<div className="container row">
					<div className="col">
						<section className="padding-top-sm dark-blue-bg"></section>

						{/* ----------- Skip Unused Numbers ---------- */}
						<div className="row align-top justify-start">
							<div className="col padding-right-xlg padding-horizontal-lg">
								<label
									className={
										this.state.skipUnused ? 'toggle checked' : 'toggle'
									}
								>
									<span className="toggle-span"></span>
									<span>SKIP UNUSED NUMBERS</span>
									<input
										type="checkbox"
										data-gamemode="skip-unused"
										onChange={this.handleCheckbox}
										checked={this.state.skipUnused}
									></input>
								</label>
							</div>
						</div>

						{/* ----------- Wild Bingo / Evens Odds ---------- */}
						<div className="row align-top justify-start">
							<div className="col grow min-size-150 padding-horizontal-lg">
								<div className="row justify-start">
									<div
										className="col padding-right-xlg"
										data-disabled={this.gameInProgress}
									>
										<label
											className={
												this.state.wildBingo ? 'toggle checked' : 'toggle'
											}
										>
											<span className="toggle-span"></span>
											<span>WILD BINGO</span>
											<input
												type="checkbox"
												data-gamemode="wild-bingo"
												onChange={this.handleCheckbox}
												checked={this.state.wildBingo}
											></input>
										</label>
									</div>
									<div
										className="col padding-right-xlg"
										data-disabled={
											!this.state.wildBingo || this.gameInProgress
										}
									>
										<label
											className={
												this.state.evensOdds ? 'toggle checked' : 'toggle'
											}
										>
											<span className="toggle-span"></span>
											<span>EVENS/ODDS</span>
											<input
												type="checkbox"
												data-gamemode="evens-odds"
												onChange={this.handleCheckbox}
												checked={this.state.evensOdds}
											></input>
										</label>
									</div>
								</div>
							</div>
						</div>

						{/* ----------- Chime ----------- */}
						<div className="row no-wrap align-center justify-start">
							<div className="col shrink padding-horizontal-lg">
								<label
									className={this.state.chime ? 'toggle checked' : 'toggle'}
								>
									<span className="toggle-span"></span>
									<span>AUDIBLE CHIME</span>
									<input
										type="checkbox"
										data-gamemode="enable-chime"
										onChange={this.handleCheckbox}
										checked={this.state.chime}
									></input>
								</label>
							</div>

							<div
								className="col grow padding-horizontal-lg"
								data-disabled={!this.state.chime}
							>
								<Select
									className="select-input"
									placeholder="Choose Chime"
									menuPlacement="auto"
									value={this.state.selectedChime}
									onChange={this.handleChooseChime}
									options={this.chimes}
									isDisabled={!this.state.chime}
								/>
							</div>
						</div>

						{/* ----------- Audible Shuffle ----------- */}
						<div className="row no-wrap align-start justify-start">
							<div className="col grow padding-horizontal-lg">
								<label
									className={
										this.state.audibleShuffle ? 'toggle checked' : 'toggle'
									}
								>
									<span className="toggle-span"></span>
									<span>AUDIBLE SHUFFLE</span>
									<input
										type="checkbox"
										data-gamemode="enable-shuffle-sound"
										onChange={this.handleCheckbox}
										checked={this.state.audibleShuffle}
									></input>
								</label>
							</div>
						</div>

						<div className="chime-menu-spacer"></div>
					</div>
				</div>
			</section>
		);
	}
}

export default Settings;
