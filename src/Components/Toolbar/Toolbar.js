import React from 'react';
import Logo from '../Logo/Logo.js';
import '../../css/Toolbar.css';

class Toolbar extends React.Component{

	render(){
		return(
			<div className="Toolbar">
				<div 
			        className={"burgerMenu"}
			        onClick={this.props.toggleSideDrawer}>
			          <div className="slant"></div>
			          <div className="slant"></div>
			          <div className="slant"></div>
			    </div>
				<Logo/>
			</div>
		);
	}
}

export default Toolbar;