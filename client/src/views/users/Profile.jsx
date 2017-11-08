import React from 'react'
import axios from 'axios'
import clientAuth from '../../clientAuth'
import { Link } from 'react-router-dom'

class Profile extends React.Component {
    state = {
        currentUser: clientAuth.getCurrentUser(),
        mounted: false,
        body: false
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
        //console.log(this.state.currentUser)

        axios({
            method: 'get',
            url: '/api/rants'
        }).then((res) => {
            this.setState({
                ...this.state,
                rants: res.data
            })
            this.setState({
                ...this.state,
                userRants: this.state.rants.filter((rant) => {
                    return rant.user == this.state.currentUser._id
                })
            })
        })

        console.log(this.state)

        // console.log(this.state)
    }

    onViewClick() {
        this.setState({
            ...this.state,
            body: !this.state.body
        })
    }

    render() {
        console.log(this.state)
        //console.log(this.state.currentUser)
        if(this.state.userRants) {
            return (
                <div className="Profile">
                    <h1>{this.state.currentUser.name}'s Ranter page</h1>
                    <Link to='/editprofile'>Edit Profile</Link>
                    <Link to='/newrant'>New Rant</Link>

                    <div className="user-rants">
                        <h3>Rants:</h3>
                            {this.state.userRants.map((rant) => {
                                return (
                                    <div key={rant._id} className='rant row'>
                                        <div className='large-2 columns'>
                                            <h3>
                                                Title: {rant.title}
                                            {/* <Link to={`/posts/${post._id}`}>{rant.title}</Link> */}
                                            </h3>
                                        </div>
                                        <div className='large-2 columns'>
                                            <h6>
                                                {rant.likes} Likes
                                            </h6>
                                        </div>
                                        <div className=' large-2 columns'>
                                            <h6>
                                                {/* rant comments here */} Comments
                                            </h6>
                                        </div>
                                        <div className='large-2 columns'>
                                            <h6>
                                                Category: {rant.category}
                                            </h6>
                                        </div>
                                        <div className='large-2 columns'>
                                            {this.state.body
                                            ? (
                                                <button onClick={this.onViewClick.bind(this)}>Hide</button>
                                            )
                                            : (
                                                <button onClick={this.onViewClick.bind(this)}>View Rant</button>
                                            )
                                            }
                                        </div>

                                        <div className='row'>
                                            {this.state.body
                                            ? (
                                                <div className='view'>
                                                    <div className='large-6 columns'>
                                                        <h6>{rant.body}</h6>
                                                    </div>
                                                    <div className='large-6 columns'>
                                                        <Link to='/editrant'>Edit Rant</Link>
                                                    </div>
                                                </div>
                                            )
                                            : (
                                                <div>

                                                </div>
                                            )
                                            }
                                        </div>

                                    </div>
                                )
                            })}
                    </div>

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