import React from 'react'
import clientAuth from '../clientAuth'

class LogIn extends React.Component {
	state = {
		fields: { email: '', password: ''}
	}

	onInputChange(evt) {
		this.setState({
			fields: {
				...this.state.fields,
				[evt.target.name]: evt.target.value
			}
		})
	}

	onFormSubmit(evt) {
		evt.preventDefault()
		clientAuth.logIn(this.state.fields).then(user => {
			this.setState({ fields: { email: '', password: '' } })
			if(user) {
				this.props.onLoginSuccess(user)
				this.props.history.push('/profile')
			}
		})
	}
	
	render() {
		const { email, password } = this.state.fields
		return (
			<div className='container'>
				<div className='LogIn'>
				<div className='login-form'>
					<h1>Log In</h1>
					<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
						<input className='login-input' type="text" placeholder="Email" name="email" value={email} />
						<input className='login-input' type="password" placeholder="Password" name="password" value={password} />
						<button>Log In</button>
					</form>
				</div>
				</div>
			</div>
		)
	}
}

export default LogIn