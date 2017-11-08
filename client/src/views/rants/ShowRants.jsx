import React from 'react'
import axios from 'axios'
import clientAuth from '../../clientAuth'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

class ShowRants extends React.Component {
    state = {
        currentUser: clientAuth.getCurrentUser(),
        mounted: false,
        bodyDisplayed: false,
        commentClicked: false
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            mounted: !this.state.mounted
        })

        axios({
            method: 'get',
            url: '/api/rants'
        }).then((res) => {
            this.setState({
                ...this.state,
                rants: res.data
            })
        })
    }

    onViewClick() {
        this.setState({
            ...this.state,
            bodyDisplayed: !this.state.bodyDisplayed
        })
    }

    render() {
        if(this.state.rants) {
            return (
                <div className='ShowRants'>
                    <h1>All dem rants</h1>
                    <h3>Search bar for rants here</h3>
                    <div className="user-rants">
                        <h3>Rants:</h3>
                            {this.state.rants.map((rant) => {
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
                                                        {/* <button onClick={this.onEditClick.bind(this, rant.id)}>Edit Rant</button> */}
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
                <div>

                </div>
            )
        }
        
    }
}

export default ShowRants