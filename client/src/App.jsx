import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import clientAuth from './clientAuth'
//import Foundation from 'react-foundation'

import NavBar from './NavBar'
import LogIn from './views/LogIn'
import LogOut from './views/LogOut'
import SignUp from './views/SignUp'
import Home from './views/Home'
import Profile from './views/users/Profile'
import EditProfile from './views/users/EditProfile'
import DeleteUser from './views/users/DeleteUser'
import NewRant from './views/rants/NewRant'
//import ShowRant from './views/rants/ShowRant'
import EditRant from './views/rants/EditRant'
import ShowRants from './views/rants/ShowRants'

class App extends React.Component {
	state = { currentUser: clientAuth.getCurrentUser() }

	onLoginSuccess(user) {
		this.setState({ currentUser: clientAuth.getCurrentUser() })
	}

	logOut() {
		clientAuth.logOut()
		this.setState({ currentUser: null })
	}
	
	render() {
		const { currentUser } = this.state
		return (
			<div className='App'>

				<NavBar currentUser={currentUser} />

				<Switch>

					<Route path="/login" render={(props) => {
						return <LogIn {...props} onLoginSuccess={this.onLoginSuccess.bind(this)} />
					}} />

					<Route path="/profile" render={(props) => {
						return currentUser
							? <Profile {...props} />
							: <Redirect to="/" />
					}} />
					
					<Route path="/explore" render={(props) => {
						return currentUser
							? <ShowRants {...props} />
							: <Redirect to="/" />
					}} />

					<Route path="/editprofile" render={(props) => {
						return currentUser
							? <EditProfile {...props} />
							: <Redirect to="/" />
					}} />

					<Route path="/deleteuser" render={(props) => {
						return <DeleteUser onLogOut={this.logOut.bind(this)} />
					}} />

					<Route exact path="/editrant/:id" render={(props) => {
						return currentUser
							? <EditRant {...props} />
							: <Redirect to="/" />
					}} />

					<Route path="/newrant" render={(props) => {
						return currentUser
							? <NewRant {...props} />
							: <Redirect to="/" />
					}} />

					{/* <Route path="/showrant" render={(props) => {
						return currentUser
							? <ShowRant {...props} />
							: <Redirect to="/" />
					}} /> */}

					<Route path="/logout" render={(props) => {
						return <LogOut onLogOut={this.logOut.bind(this)} />
					}} />

					{/* the sign up component takes an 'onSignUpSuccess' prop which will perform the same thing as onLoginSuccess: set the state to contain the currentUser */}
					<Route path="/signup" render={(props) => {
						return <SignUp {...props} onSignUpSuccess={this.onLoginSuccess.bind(this)} />
					}} />

					<Route path="/" component={Home} />

				</Switch>
			</div>
		)
	}
}

export default App