import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Colors } from 'react-foundation'

const NavBar = (props) => {
	return (
		<div className='NavBar'>
			<Link to="/">Home</Link>
			{props.currentUser
				? (
					<span>
						<Link to="/vip">VIP</Link>
						<Link to="/logout">Log Out</Link>
					</span>
				)
				: (
					<span>
					<Button color={Colors.SUCCESS}>Test</Button>
						<Link to="/login">Log In</Link>
						<Link to="/signup">Sign Up</Link>
					</span>
				)
			}
		</div>
	)
}

export default NavBar