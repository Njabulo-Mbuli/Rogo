import React, {Component,Fragment} from 'react';
import {Link,withRouter} from 'react-router-dom'
import '../../css/SideDrawer.css';
import Logo from '../Logo/Logo';
import Backdrop from '../BackDrop/Backdrop.js';

class SideDrawer extends Component{

	render(){
		let attachedClasses = ["SideDrawer","Open"]
		
		if(!this.props.show){
			attachedClasses=["SideDrawer","Closed"];
		}
		return(
			<Fragment>
				<Backdrop show={this.props.show} hideModal={this.props.toggleView}/>
				<div className={attachedClasses.join(" ")}>
					<Logo/>
				<nav className="try">
	  				<ul className="navigation_items_sideDrawer">
	  					<li onClick={this.props.toggleView}>Home</li>
	  					<li onClick={this.props.toggleView}><a href="http://www.njabulombuli.co.za" target="_blank" rel="noopener noreferrer">My Website</a></li>
	  				</ul>
	  			</nav>

	  			<div style={{marginTop:"40vh"}}>
	  				<h3>
	  					<a href="http://www.njabulombuli.co.za">
	  						<em>Developed and maintained by Njabulo Mbuli</em>
	  					</a>
	  				</h3>
	  			</div>

	  			{//this div is acting as an event listener, incase the user clicks
	  			 //open space on the sidedrawer, the sidedrawer needs to close
	  			}
	  			<div onClick={this.props.toggleView}
	  				style={{width:"100%",height:"100%", position:"absolute", top:"0",left:"0",zIndex:"-5"}}>
	  			</div>

				</div>
			</Fragment>
		);
	}
}

export default SideDrawer;