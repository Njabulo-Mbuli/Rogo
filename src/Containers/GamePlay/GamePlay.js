import React from 'react';

class GamePlay extends React.Component{
	
	constructor(props){
		super(props);

		let {
			reservePlayers,
			difficulty,
			category,
			numberOfQuestions,
			firstTeamTotal,
			secondTeamTotal,
			teamOnePlayers,
			teamTwoPlayers} = this.props

		this.state={
			answer:false,
			reservePlayers:reservePlayers,
			numberOfQuestions:numberOfQuestions,
			firstTeamTotal:firstTeamTotal,
			secondTeamTotal:secondTeamTotal,
			questions:null,
			teamOnePlayers:teamOnePlayers,
			teamTwoPlayers:teamTwoPlayers
		}

		this.fetchQuestions(difficulty,numberOfQuestions,category);
	}

	fetchQuestions=(difficulty,numberOfQuestions,category)=>{
		console.log(difficulty," ",numberOfQuestions," ",category);
		fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`)
			        .then(result=>{
			        	console.log(result);
			           return result.json();
			        }).then(result=>{
			        	console.log(result);
			        	this.setState(prevState=>{
			        		return{
			        			...prevState,
			        			questions:result.results
			        		}
			        	});
			        });
	}

	decodeHtml(html) {
    	var txt = document.createElement("textarea");
    	txt.innerHTML = html;
    	return txt.value;
	}

	render(){
		let display=null;
		
		if(this.state.questions){
			
			display=<div style={{height:"60vh",width:"95vw",backgroundColor:"red",display:"flex",alignContent:"flex-end",marginTop:"20vh"}}>
						<p>{
							this.decodeHtml(this.state.questions[0].question)
						}</p>
					</div>
		}

		return(
			<React.Fragment>
					{display}
			 </React.Fragment>
		);
	}
}

export default GamePlay;