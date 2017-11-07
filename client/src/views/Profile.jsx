import React from 'react'
import axios from 'axios'
import clientAuth from '../clientAuth'

class Profile extends React.Component {
    state = {
        currentUser: null,
        mounted: false,
    }
    
    componentDidMount() {
        this.setState({
            currentUser: clientAuth.getCurrentUser(),
            mounted: true
        })
        console.log(this.state.currentUser)
        const id = this.props.match.params.id
        // could also do const { id } = this.props.match.params
        axios({
            method: 'get',
            url: `/api/users/${id}`
        }).then((res) => {
            //console.log(res.data)
            this.setState({
                user: res.data
            })
            console.log(this.state)
        })
        console.log(this.state)
        console.log('component mounted')
    }

    render() {
        // if(mounted === true) {
            return (
                <div className="Profile">
                    <h1>ExampleUser's Ranter page</h1>
                    {/* <h1>{this.state.currentUser.name}'s Ranter page</h1> */}

                </div>
            )
        // }
        // else {
            // <div className='not-mounted'>

            // </div>
        // }
    }
}

export default Profile