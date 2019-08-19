import React from 'react';

const PlayerCard = ({playerName,removePlayerHandler}) =>{
	return(
		<div style={{
				minWidth:"60px",
				display:"flex",
				height:"25px",
				justifyContent:"space-between",
				backgroundColor:"lightblue",
				borderRadius:"25px",
				padding:"0.5em 1.2em",
				fontSize:"1em",
				margin:"0.2em"}}>
			{playerName}
			<div style={{marginLeft:"0.2em",color:"red",fontWeight:"900",cursor:"pointer"}} onClick={()=>{removePlayerHandler(playerName)}}>
				X
			</div>
		</div>
	);
}
export default PlayerCard;