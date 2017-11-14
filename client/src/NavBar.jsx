import React from 'react'
import  FLink from './FLink'
import { ButtonGroup } from 'react-foundation'

const NavBar = (props) => {
	return (
		<div className='NavBar'>
			{props.currentUser
				? (
					<ButtonGroup className='menu-hover-lines'>
						<FLink className='nav-btn' to="/">Home</FLink>
						<div className='right'>
							<FLink className='nav-btn' to="/profile">Profile</FLink>
							<FLink className='nav-btn' to="/explore">Explore Rants</FLink>
							<FLink className='nav-btn' to="/logout">Log Out</FLink>
						</div>
					</ButtonGroup>
				)
				: (
					<ButtonGroup>
						<FLink className='nav-btn' to="/">Home</FLink>
						<div className='right'>
							<FLink className='nav-btn' to="/login">Log In</FLink>
							<FLink className='nav-btn' to="/signup">Sign Up</FLink>
						</div>
					</ButtonGroup>
				)
			}
		</div>
	)
}

export default NavBar