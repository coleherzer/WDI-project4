import React from 'react'
import axios from 'axios'
import clientAuth from '../../clientAuth'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

class ShowRants extends React.Component {
    state = {
        currentUser: clientAuth.getCurrentUser(),
        mounted: false,
        rantBeingViewed: null,
        bodyDisplayed: false,
        commentClicked: false,
        filter: ''
    }

    // this.state.rants.filter(...yourcodehere...).map()

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

    onViewClick(id) {
        if(id) {
            this.setState({
                rantBeingViewed: id,
                bodyDisplayed: !this.state.bodyDisplayed
            })
        } else {
            this.setState({
                rantBeingViewed: null,
                bodyDisplayed: !this.state.bodyDisplayed
            })
        }
    }

    onSearchSubmit() {
        console.log('search attempted')
    }

    render() {
        if(this.state.rants) {
            return (
                <div className='ShowRants'>
                    <h1>All dem rants</h1>
                    <form onSubmit={this.onSearchSubmit.bind(this)}>
                        <input className='search-input' type="text" placeholder=''/>
                        <button type='submit'>Search Rants</button>
                    </form>
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
                                            {this.state.bodyDisplayed && this.state.rantBeingViewed === rant._id
                                            ? (
                                                <button onClick={this.onViewClick.bind(this)}>Hide</button>
                                            )
                                            : (
                                                <button onClick={this.onViewClick.bind(this, rant._id)}>View Rant</button>
                                            )
                                            }
                                        </div>
                                    <div className='row'>
                                        {this.state.rantBeingViewed === rant._id
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