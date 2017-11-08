import React from 'react'
import axios from 'axios'
import clientAuth from '../../clientAuth'
import { Link } from 'react-router-dom'

class Profile extends React.Component {
    state = {
        currentUser: null,
        mounted: false
    }
    
    componentDidMount() {
        //Wouldnt need all of this if I can set currentUser above
        this.setState({
            ...this.state,
            currentUser: clientAuth.getCurrentUser(),
            mounted: true
        })
        // console.log(this.state.currentUser)
        // const id = this.props.match.params.id
        // // could also do const { id } = this.props.match.params
        // axios({
        //     method: 'get',
        //     url: `/api/users/${id}`
        // }).then((res) => {
        //     //console.log(res.data)
        //     this.setState({
        //         user: res.data
        //     })
        //     console.log(this.state)
        // })
        console.log(this.state)
        console.log(this.state.currentUser)
    }

    render() {
        if(this.state.mounted === true) {
            return (
                <div className="Profile">
                    <h1>{this.state.currentUser.name}'s Ranter page</h1>
                    <Link to='/editprofile'>Edit Profile</Link>
                    <button>New Rant</button>

                </div>
            )
        }
        else {
            return (
                <div className='not-mounted'>
                    <h1>Yo... its not even mounted yet...</h1>
                </div>
            )
        }
    }
}

export default Profile