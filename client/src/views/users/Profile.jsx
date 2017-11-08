import React from 'react'
import axios from 'axios'
import clientAuth from '../../clientAuth'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

class Profile extends React.Component {
    state = {
        currentUser: clientAuth.getCurrentUser(),
        mounted: false,
        bodyDisplayed: false,
        commentClicked: false
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
                    return rant.user === this.state.currentUser._id
                })
            })
        })

        console.log(this.state)
    }

    onViewClick() {
        this.setState({
            ...this.state,
            bodyDisplayed: !this.state.bodyDisplayed
        })
    }

    onEditClick(id) {
        this.props.history.push(`/editrant/${id}`)
    }

    onCommentClick() {
        // this.setState({
        //     ...this.state,
        //     commentClicked: true
        // })
    }

    render() {
        //console.log(this.state)
        //console.log(this.state.currentUser)
        if(this.state.userRants) {
            return (
                <div className="Profile">
                    <h1>{this.state.currentUser.name}'s Ranter page</h1>
                    <Link to='/editprofile'>Edit Profile</Link>
                    <Link to='/newrant'>New Rant</Link>

                    <div className="user-rants">
                        <h3>My Rants:</h3>
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
                                                {rant.comments.length} Comments
                                            </h6>
                                        </div>
                                        <div className='large-2 columns'>
                                            <h6>
                                                Category: {rant.category}
                                            </h6>
                                        </div>
                                        <div className='large-2 columns'>
                                            {this.state.bodyDisplayed
                                            ? (
                                                <button onClick={this.onViewClick.bind(this)}>Hide</button>
                                            )
                                            : (
                                                <button onClick={this.onViewClick.bind(this)}>View Rant</button>
                                            )
                                            }
                                        </div>

                                        <div className='row'>
                                            {this.state.bodyDisplayed
                                            ? (
                                                <div className='view'>
                                                    <div className='large-4 columns'>
                                                        <h6>{rant.body}</h6>
                                                        {/* also going to need to display rant comments here */}
                                                    </div>
                                                    <div className='large-4 columns'>
                                                        <button onClick={() => {
                                                            (swal({
                                                            title: "Add Comment",
                                                            content: {
                                                                element: "input",
                                                                attributes: {
                                                                    placeholder: "Comment",
                                                                    type: "test",
                                                                },
                                                            },
                                                        }))}}>Comment</button>
                                                    </div>
                                                    <div className='large-4 columns'>
                                                        <Link to={`/editrant/${rant._id}`}>Edit Rant</Link>
                                                        <button onClick={this.onEditClick.bind(this, rant.id)}>Edit Rant</button>
                                                    </div>
                                                </div>
                                            )
                                            : (
                                                <div>

                                                </div>
                                            )
                                            }
                                        </div>

                                        <div className='row'>
                                            {this.state.commentClicked
                                            ? (
                                                <div className='commentForm'>
                                                    <h1>form for comments</h1>
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
                </div>
            )
        }
    }
}

export default Profile

/*
onClick={this.onCommentClick(swal({
    content: {
        element: "input",
        attributes: {
        placeholder: "Type your password",
        type: "password",
        },
    },
    }))}
*/

/* <div>
    <button onClick={() => this.setState({ show: true })}>Alert</button>
    <SweetAlert
        show={this.state.show}
        title="Add Comment"
        formField= ""
        /* attributes= 
            placeholder= "Type your password"
            type= "text"
        */
//         onConfirm={() => this.setState({ show: false })}
//     />
// </div> */