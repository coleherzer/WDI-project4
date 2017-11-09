import React from 'react'
import  FLink from './FLink'
import { ButtonGroup } from 'react-foundation'

const NavBar = (props) => {
	return (
		<div className='NavBar'>
			{props.currentUser
				? (
					<ButtonGroup>
						<FLink to="/">Home</FLink>
						<div className='right'>
							<FLink to="/profile">Profile</FLink>
							<FLink to="/explore">Explore Rants</FLink>
							<FLink to="/logout">Log Out</FLink>
						</div>
					</ButtonGroup>
				)
				: (
					<ButtonGroup>
						<FLink to="/">Home</FLink>
						<div className='right'>
							<FLink to="/login">Log In</FLink>
							<FLink to="/signup">Sign Up</FLink>
						</div>
					</ButtonGroup>
				)
			}
		</div>
	)
}

export default NavBar