import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonGroup, Link as Flink } from 'react-foundation'

const NavBar = (props) => {
	return (
		<div className='NavBar'>
			{props.currentUser
				? (
					<span>
						<ButtonGroup>
							<Link to="/">Home</Link>
							<Link to="/profile">Profile</Link>
							<Link to="/showrants">Explore Rants</Link>
							<Link to="/logout">Log Out</Link>
						</ButtonGroup>
					</span>
				)
				: (
					<span>
						<ButtonGroup>
							<Link to="/">Home</Link>
							<Link to="/login">Log In</Link>
							<Link to="/signup">Sign Up</Link>
						</ButtonGroup>
					</span>
				)
			}
		</div>
	)
}

export default NavBar