import React from 'react';
import Toolbar from '../../Components/Toolbar/Toolbar';
import SideDrawer from '../../Components/SideDrawer/SideDrawer';


class Layout extends React.Component{
	state={
		showSideDrawer:false
	}

	//Function handling the side drawer action on hamburger click
	showSideDrawerToggle=()=>{
		this.setState((prevState)=>{
			return	{
				showSideDrawer:!prevState.showSideDrawer
			}
		});
	}

	render(){
		return(
			<React.Fragment>
				<Toolbar toggleSideDrawer={()=>{
					this.showSideDrawerToggle()
				}}/>
				<SideDrawer show={this.state.showSideDrawer}
							toggleView={this.showSideDrawerToggle}/>
				{this.props.children}
			</React.Fragment>
		);
	}
}

export default Layout;