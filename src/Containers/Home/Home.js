import React from 'react';
import '../../css/Home.css';
import '../../css/GlobalStyles.css';
import PlayerCard from '../../Components/PlayerCard/PlayerCard';
import {TweenLite,TimelineLite} from 'gsap';

class Home extends React.Component{
	state={
		players:[],
		formErrors:[]
	}

	showGameSetup=()=>{
		let container=document.getElementsByClassName("addPlayersBox");
		let landingPageText=document.getElementsByClassName("landingPageText");

		//When I use calc() the tween breaks and just pops into position.
		//So the next two lines are using javascript to calculate the placement position
		let modalPlacement=Math.max(window.innerWidth||0);
		modalPlacement=(2.5*modalPlacement)/100;

		var timeline = new TimelineLite();

		timeline.to(landingPageText,1,{left:"-80%"})
				.to(landingPageText,4,{opacity:0},-1)
				.to(container,2,{left:modalPlacement},-0.2);

	}

	gameSettings=()=>{
		if(this.state.players.length>1){
			let addPlayersBox=document.getElementsByClassName("addPlayersBox");
			let chooseSettingsBox=document.getElementsByClassName("chooseSettings");

			//When I use calc() the tween breaks and just pops into position.
			//So the next two lines are using javascript to calculate the placement position
			let modalPlacement=Math.max(window.innerWidth||0);
			modalPlacement=(2.5*modalPlacement)/100;

			var timeline = new TimelineLite();

			timeline.to(addPlayersBox,2,{left:"-80%"})
					.to(addPlayersBox,3,{opacity:0},-0.5)
					.to(chooseSettingsBox,2,{left:modalPlacement},-0.2);
			}
	}
	
	getGameSettings=()=>{
		let difficulty = document.getElementById("difficulty");
		let category = document.getElementById("category");
		let numberOfQuestions = document.getElementById("numberOfQuestions");
		let firstTeam = document.getElementById("firstTeam");
		let secondTeam = document.getElementById("secondTeam");
		let errorList=[];

		difficulty=difficulty.options[difficulty.selectedIndex].value;
		category=category.options[category.selectedIndex].value;
		firstTeam=parseInt(firstTeam.value)||0;
		secondTeam=parseInt(secondTeam.value)||0;
		numberOfQuestions=parseInt(numberOfQuestions.value)||0;

		if(numberOfQuestions>50 || numberOfQuestions<2){
			errorList=[...errorList,"You must choose between 2 and 50 questions"];
		}
		if(firstTeam<1||secondTeam<1){
			errorList=[...errorList,"You must have atleast one member per team"];
		}
		if(firstTeam+secondTeam>this.state.players.length){
			errorList=[...errorList,`You can't have more than ${this.state.players.length} total players`];
		}

		this.addErrors(errorList);

		setTimeout(()=>{
			if(this.state.formErrors.length===0){
				window.players=this.state.players
				this.props.history.push({
					pathname:'#/NewGame',
					search:`difficulty=${difficulty}&category=${category}&numberOfQuestions=${numberOfQuestions}&firstTeam=${firstTeam}&secondTeam=${secondTeam}`
				});
			}},50);
	}

	addErrors=(errorList)=>{
		this.setState(prevState=>{
			return{
				...prevState,
				formErrors:[...errorList]
			}
		});
	}

	addPlayerHandler=()=>{

		let player=document.getElementById("playerName");
		let checkPlayerDuplicate=this.state.players.indexOf(player.value);

		if(checkPlayerDuplicate<0 && player.value.length>0){
			this.setState(prevState=>{

				let playerList=[...prevState.players,player.value];
				
				return{
					...prevState,
					players:playerList
				}

			});

			setTimeout(()=>{player.value="";},80)
		}else{
			alert("Please enter a unique player name first...");
		}
	}

	removePlayerHandler=(name)=>{
		
		this.setState(prevState=>{
			let playerList = [...prevState.players];
			let indexOfPlayer = playerList.indexOf(name);

			playerList.splice(indexOfPlayer,1);

			return{
				...prevState,
				players:playerList
			}
		});
	}

	render(){
		return(
			<div className="home">
				
				<div className="landingPageText">
					<h3>Got what it takes?</h3>
					<p>
						Rogo is a quiz game intended to test your knowledge on any category you choose.
						It is simple to play and can be loads of fun for groups of people.
					</p>

					<button className="gradientButton" onClick={()=>{this.showGameSetup()}}>
						Start Game
					</button>
				</div>

				<div className="graphicalItems">
					<div className="punctuation">
						<div className="exclamationMark">!</div>
						<div className="questionMark">?</div>
					</div>
				</div>

				<div className="addPlayersBox">
					<h3 className="heading" style={{marginBottom:"2em"}}>Add atleast two players...</h3>
					
					<div style={{display:"flex",justifyContent:"space-around",width:"100%"}}>
						<input id="playerName" style={{fontSize:"1em"}} placeholder="Enter players here"/>
						<button className="greenButton"
								onClick={()=>{this.addPlayerHandler()}}>
							Add Player
						</button>
					</div>

					<div className="displayPlayers">
						{this.state.players.map((player,index)=>{
							return <PlayerCard 
										key={index}
										playerName={player}
										removePlayerHandler={(name)=>{this.removePlayerHandler(name)}}/>
							})
						}
					</div>
					<button 
						className={this.state.players.length>1?"greenButton":"deactivatedButton"}
						onClick={()=>{this.gameSettings()}}
						style={{marginRight:"0.7em",alignSelf:"flex-end"}}>Next</button>
				</div>

				<div className="chooseSettings">
					<h3 className="heading">One last thing</h3>
					<form style={{display:"flex",flexFlow:"column",justifyContent:"center"}}>
						<div>
							<label>Number of questions:</label>
							<input type="range number" min="2" max="50" id="numberOfQuestions" defaultValue="10" name="numberOfQuestions" style={{width:"2.5em",textAlign:"center"}}/>
						</div>

						<div>
							<label>Select category:</label>
							<select id="category">
							<option value={9}>General Knowledge</option>
							<option value={11}>Movies</option>
							<option value={12}>Music</option>
							<option value={14}>Television</option>
							<option value={15}>Video Games</option>
							<option value={18}>Computers</option>
							<option value={21}>Sports</option>
							<option value={22}>Geography</option>
							<option value={23}>History</option>
							<option value={26}>Celebrities</option>
							<option value={28}>Vehicles</option>
							</select>
						</div>
					
					<div>
						<label>Select difficulty:</label>
						
						<select id="difficulty">
							<option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
						</select>
					</div>

					<h4 style={{textAlign:"center"}}>Number of players per team:</h4>
				
						<div style={{display:"flex",justifyContent:"center"}}>
							<div>
								<label>Team 1</label>
								<input type="number" min="1" max={this.state.players.length-1} id="firstTeam" defaultValue="1" style={{width:"2.5em"}}/>
							</div>
							<div>
								<label>Team 2</label>
								<input id="secondTeam" min="1" max={this.state.players.length-1} type="number" defaultValue="1" style={{width:"2.5em"}}/>
							</div>
						</div>
					<button type="button" style={{alignSelf:"flex-end"}} onClick={()=>{this.getGameSettings()}}>Start Playing</button>
					</form>
				
					{this.state.formErrors.length>0?
						<div style={{padding:"0.4em"}}>
							<h5>Please note:</h5>
							<ul>
								{this.state.formErrors.map((error,index)=>{
									return <li key={index}>{error}</li>
								})}
							</ul>
						</div>:null}
				</div>
			</div>
		);
	}
}

export default Home;