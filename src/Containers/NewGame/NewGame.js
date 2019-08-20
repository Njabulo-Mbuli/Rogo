import React from 'react';
import GamePlay from '../GamePlay/GamePlay';

class NewGame extends React.Component{
	state={
		difficulty:null,
		category:null,
		reservePlayers:[],	
		numberOfQuestions:null,
		firstTeamTotal:null,
		secondTeamTotal:null,
		questions:null,
		teamOnePlayers:[],
		teamTwoPlayers:[]
	}
	UNSAFE_componentWillMount(){
		const query = new URLSearchParams(this.props.location.search);
		let difficulty,category,numberOfQuestions,firstTeamTotal,secondTeamTotal;

		for(let param of query.entries()){
			switch (param[0]){
				case "difficulty":
					difficulty=param[1];
					break;
				case "category":
					category=param[1];
					break;
				case "numberOfQuestions":
					numberOfQuestions=param[1];
					break;
				case "firstTeam":
					firstTeamTotal=param[1];
					break;
				case "secondTeam":
					secondTeamTotal=param[1];
					break;
			}
		}

		this.saveData(difficulty,category,numberOfQuestions,firstTeamTotal,secondTeamTotal);
		setTimeout(()=>{this.assignTeams()},50);
	}

	assignTeams=()=>{
		let players=[...window.players];
		let count =players.length;
		let teamOne=[];
		let teamTwo=[];

		while(count>0){
			let randomValue=Math.floor(Math.random()*count);
			let teamsFull=true;
			//adding the teams to players
			if(teamOne.length+teamTwo.length<this.state.secondTeamTotal+this.state.firstTeamTotal){
				if(count%2!==0&&teamOne.length<this.state.firstTeamTotal){
					teamOne=[...teamOne,players[randomValue]]
					teamsFull=false;
				}else{
					if (this.state.secondTeamTotal>teamTwo.length){
						teamTwo=[...teamTwo,players[randomValue]];
						teamsFull=false;
					} else if(this.state.firstTeamTotal>teamOne.length){
						teamOne=[...teamOne,players[randomValue]];
						teamsFull=false
					}
				}
			}
			else{
				count=0;
			}

			if(teamsFull){
				this.setState(prevState=>{
					return{
						...prevState,
						reservePlayers:[...this.state.reservePlayers,players[randomValue]]
					}
				});
			}
			players.splice(randomValue,1);
			count--;
		}

		this.addTeamPlayers(teamOne,teamTwo);
	}

	addTeamPlayers=(teamOne,teamTwo)=>{
		this.setState(prevState=>{
			return{
				...prevState,
				teamOnePlayers:[...teamOne],
				teamTwoPlayers:[...teamTwo]
			}
		});
	}

	saveData=(difficulty,category,numberOfQuestions,firstTeamTotal,secondTeamTotal)=>{
		this.setState(prevState=>{
			return{
				...prevState,
				difficulty:difficulty,
				category:category,
				numberOfQuestions:numberOfQuestions,
				firstTeamTotal:firstTeamTotal,
				secondTeamTotal:secondTeamTotal
			}
		});
	}

	render(){
		return(
			<GamePlay reservePlayers={this.state.reservePlayers}
				difficulty={this.state.difficulty}
				category={this.state.category}	
				numberOfQuestions={this.state.numberOfQuestions}
				firstTeamTotal={this.state.firstTeamTotal}
				secondTeamTotal={this.state.secondTeam}
				teamOnePlayers={this.state.teamOnePlayers}
				teamTwoPlayers={this.state.teamTwoPlayers}/>
		);
	}
}

export default NewGame;