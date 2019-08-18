import React from 'react';
import '../../css/Logo.css';

const Logo=()=>{
	return(
		<div className="LogoWithTitle">
			<div className="Logo">
				<div className="circle1"></div>
				<div className="circle2"></div>
				<div className="circle3"></div>
			</div>
			<h3 className="Title">Rogo</h3>
		</div>
	);
}

export default Logo;