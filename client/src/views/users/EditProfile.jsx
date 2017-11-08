import React from 'react'
import axios from 'axios'
import clientAuth from '../../clientAuth'
import { Link } from 'react-router-dom'

class EditProfile extends React.Component {

    state = {
        currentUser: clientAuth.getCurrentUser(),
        fields: {
            name: '',
            email: '',
            password: ''            
        }, 
        mounted: false
    }

    componentDidMount() {
        //this.props.match.params.id
        const id = this.state.currentUser._id
        console.log(id)
        // could also do const { id } = this.props.match.params
        axios({
            method: 'get',
            url: `/api/users/${id}`
        }).then((res) => {
            console.log(res.data)
            this.setState({
                fields: {
                    name: res.data.name,
                    email: res.data.email,
                    password: res.data.password
                }, 
                mounted: true
            })
        })
    }

    onFormSubmit(evt, id) {
        evt.preventDefault()
        const userId = this.state.currentUser._id
        console.log(this.state.fields)
        axios({
            method: 'patch',
            url: `/api/users/${userId}`,
            data: this.state.fields
        }).then((res) => {
            console.log(res.data)
            this.setState({
                fields: res.data
            })
            // a built in prop with react router, here we are pushing a new route
            // to the history of the app, basically redirecting
            this.props.history.push('/profile')
        })
    }

    onInputChange(evt) {
        this.setState({
            fields: {
                ...this.state.fields,
                // using brackets below it will figure out which target name is being changed
                [evt.target.name]: evt.target.value
            }
        })
    }

    render() {
        // const post = this.state.post

        // console.log(this.props)
        if (this.state.mounted === false) {
            return (
                <div>
                </div>
            )
        }
        else {
            return (
                <div className='EditProfile'>
                    <h1>Edit Profile: {this.state.fields.name}</h1>
                    {/* below adding the onChange will add that method to all of the form */}
                    <form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
                        <input type="text" defaultValue={this.state.fields.name} name="name"/>
                        <input type="text" defaultValue={this.state.fields.email} name='email'/>
                        <input type="password" defaultValue={this.state.fields.password} name='password'/>
                        <button type="submit">Edit Profile</button>
                    </form>
                    <Link to='/deleteuser'>Delete Account</Link>
                </div>
            )
        }
    }
}

export default EditProfile