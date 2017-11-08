import React from 'react'
import axios from 'axios'
import clientAuth from '../../clientAuth'
import { Link } from 'react-router-dom'

class Profile extends React.Component {
    state = {
        currentUser: clientAuth.getCurrentUser(),
        mounted: false
    }
    
    componentDidMount() {
        const id = this.state.currentUser._id
        //Wouldnt need all of this if I can set currentUser above
        this.setState({
            ...this.state,
            mounted: !this.state.mounted
        })
        // console.log(this.state.currentUser)
        // const id = this.props.match.params.id
        // // could also do const { id } = this.props.match.params
        axios({
            method: 'get',
            url: `/api/users/${id}`
        }).then((res) => {
            //console.log(res.data)
            this.setState({
                ...this.state,
                currentUser: res.data
            })
        })
        console.log(this.state)
        console.log(this.state.currentUser)
    }

    render() {
        console.log(this.state)
        console.log(this.state.currentUser)
        if(this.state.mounted === true) {
            return (
                <div className="Profile">
                    <h1>{this.state.currentUser.name}'s Ranter page</h1>
                    <Link to='/editprofile'>Edit Profile</Link>
                    <Link to='/newrant'>New Rant</Link>

                    {/* {this.state.currentUser.rants.map((rant) => {
                        return (
                            <div key={rant._id} className='rant'>
                                <h3>
                                    {rant.title} */}
                                {/* <Link to={`/posts/${post._id}`}>{rant.title}</Link> */}
                                {/* </h3>
                            </div>
                        )
                    })} */}

                </div>
            )
        }
        else {
            return (
                <div className='not-mounted'>
                    <h1>its not even mounted yet...</h1>
                </div>
            )
        }
    }
}

export default Profile