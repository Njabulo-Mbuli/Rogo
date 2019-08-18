import React from 'react';
import Toolbar from '../../Components/Toolbar/Toolbar';
import SideDrawer from '../../Components/SideDrawer/SideDrawer';
import Particles from 'react-particles-js';


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
			<div style={{height:"100vh",backgroundColor:"white"}}>
				<Toolbar toggleSideDrawer={()=>{
					this.showSideDrawerToggle()
				}}/>
				<SideDrawer show={this.state.showSideDrawer}
							toggleView={this.showSideDrawerToggle}/>
				<Particles 
                style={{position:"absolute",top:"0",left:"0",width:"100vw",height:"100vh"}}
                params={{
                "particles": {
                    "number": {
                        "value": 20,
                        "density": {
                            "enable": true,
                            "value_area": 1803.4120608655228
                        }
                    },
                    "color": {
                        "value": "#EE6363"
                    },
                    "shape": {
                        "type": "circle",
                        "polygon": {
                            "nb_sides": 4
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 0.4,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.2,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 80,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 30,
                            "size_min": 60,
                            "sync": false
                        }
                    },
                    "move": {
                        "enable": true,
                        "speed": 6,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                }
            }} />
				{this.props.children}
			</div>
		);
	}
}

export default Layout;