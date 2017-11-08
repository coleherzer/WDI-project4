import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import clientAuth from '../../clientAuth'

class DeleteUser extends React.Component {
    state = {
        currentUser: clientAuth.getCurrentUser(),
    }

	componentDidMount() {
        const id = this.state.currentUser._id
        axios({
            method: 'delete',
            url: `/api/users/${id}`
        }).then((res) => {
            // console.log(res.data)
            // this.setState({
            //     fields: res.data
            // })
            // a built in prop with react router, here we are pushing a new route
            // to the history of the app, basically redirecting
            //this.props.history.push('/')
            console.log('Deleted that user')
        })
        this.props.onLogOut()
	}
	
	render() {
		return <Redirect to="/" />
	}
}

export default DeleteUser