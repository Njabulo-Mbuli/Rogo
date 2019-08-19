import React from 'react';
import '../../css/Home.css';
import '../../css/GlobalStyles.css';
import PlayerCard from '../../Components/PlayerCard/PlayerCard';
import {TweenLite,TimelineLite} from 'gsap';

class Home extends React.Component{
	state={
		players:[]
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
			
		}
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
		}
	}

	removePlayerHandler=(name)=>{
		
		this.setState(prevState=>{
			let playerList = [...prevState.players];
			let indexOfPlayer=playerList.indexOf(name);

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
					<p>Rogo is a quiz game intended to test your knowledge on any category you choose. It is simple to play and can be loads of fun for groups of people.</p>
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
					<h3 style={{marginBottom:"2em"}}>Add atleast two players...</h3>
					
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
										removePlayerHandler={(key)=>{this.removePlayerHandler(key)}}/>
							})
						}
					</div>
					<button 
						className={this.state.players.length>1?"greenButton":"deactivatedButton"}
						onClick={()=>{this.gameSettings()}}
						style={{marginRight:"0.7em",alignSelf:"flex-end"}}>Next</button>
				</div>
			</div>
		);
	}
}

export default Home;