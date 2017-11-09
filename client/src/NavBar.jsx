import React from 'react'
import  FLink from './FLink'
import { ButtonGroup } from 'react-foundation'

const NavBar = (props) => {
	return (
		<div className='NavBar'>
			{props.currentUser
				? (
					<span>
						<ButtonGroup>
							<FLink className="button" to="/">Home</FLink>
							<FLink to="/profile">Profile</FLink>
							<FLink to="/explore">Explore Rants</FLink>
							<FLink to="/logout">Log Out</FLink>
						</ButtonGroup>
					</span>
				)
				: (
					<span>
						<ButtonGroup>
							<FLink to="/">Home</FLink>
							<FLink to="/login">Log In</FLink>
							<FLink to="/signup">Sign Up</FLink>
						</ButtonGroup>
					</span>
				)
			}
		</div>
	)
}

export default NavBar