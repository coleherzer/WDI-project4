import React from 'react'
import axios from 'axios'
import clientAuth from '../../clientAuth'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

class RecentRants extends React.Component {
    state = {
        mounted: false,
        rantBeingViewed: null,
        bodyDisplayed: false,
        commentClicked: false,
        filter: ''
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
                currentUser: clientAuth.getCurrentUser() || null,
                rants: res.data
            })

            // order rants by most recent
            this.setState({
                rants: this.state.rants.sort((a,b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt)
                    })
            })

            // limit # of rants to 10
            this.setState({
                rants: this.state.rants.slice(0, 10)
            })
        })
    }

    getInfo() {
        axios({
            method: 'get',
            url: '/api/rants'
        }).then((res) => {
            this.setState({
                ...this.state,
                currentUser: clientAuth.getCurrentUser() || null,
                rants: res.data
            })

            // order rants by most recent
            this.setState({
                rants: this.state.rants.sort((a,b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt)
                    })
            })

            // limit # of rants to 10
            this.setState({
                rants: this.state.rants.slice(0, 10)
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

    onLikeClick(id) {
        const rant = this.state.rants.filter((rant) => {
            return id === rant._id
        })
        rant[0].likes += 1
        axios({
            method: 'patch',
            url: `/api/rants/${id}`,
            data: rant[0]
        }).then((res) => {
            console.log(res.data)
            this.setState({
                ...this.state.userRants
            })
        })
    }

    onCommentClick(id) {
        //const id = id
        const rant = this.state.rants.find((rant) => {
            return id === rant._id
        })

        swal({
            title: 'Add Comment',
            content: {
                element: "input",
                attributes: {
                    placeholder: "Comment",
                    type: "text",
                    name: 'body'
                }
            },
        }).then((commentBody) => {
            console.log(commentBody)
            axios({ method: 'post', url: `/api/rants/${id}/comments`, data: {body: commentBody} })
            .then((res) => {
                console.log(res.data)
                this.setState({
                    ...this.state
                    //commentClicked: true
                })
                this.getInfo()
            })
        })
    }

    onSearchSubmit() {
        console.log('search attempted')
    }

    onDeleteClick(id, commentId) {
        console.log(id)

        axios({
            method: 'delete',
            url: `/api/rants/${id}/comments/${commentId}`
        }).then((res) => {
            console.log('Deleted that comment')
            this.getInfo()
        })
    }

    render() {
        console.log(this.state.rants)
        if(this.state.rants) {
            return (
                <div className='RecentRants'>
                    {this.state.rants.map((rant) => {
                            return (
                                <div key={rant._id} className='rant row'>
                                <div className='rant-header row'>
                                    <div className='large-4 columns'>
                                        <h4 className='text'>
                                            Title: {rant.title}
                                        {/* <Link to={`/posts/${post._id}`}>{rant.title}</Link> */}
                                        </h4>
                                    </div>
                                    <div className='large-4 columns'>
                                        <h4 className='text'>
                                            Category: {rant.category}
                                        </h4>
                                    </div>
                                    <div className='large-4 columns view-btn'>
                                        {this.state.bodyDisplayed && this.state.rantBeingViewed === rant._id
                                        ? (
                                            <button className='button radius' onClick={this.onViewClick.bind(this)}>Hide</button>
                                        )
                                        : (
                                            <button className='button radius' onClick={this.onViewClick.bind(this, rant._id)}>View Rant</button>
                                        )
                                        }
                                    </div>
                                </div>
                                <div className='likes-comments row'>
                                    <div className='large-4 columns'>
                                        <h6 className='text'>
                                            {rant.likes} Likes
                                        </h6>
                                    </div>
                                    <div className=' large-4 columns'>
                                        <h6 className='text'>
                                            {rant.comments.length} Comments
                                        </h6>
                                    </div>
                                    <div className=' large-4 columns'>
                                    </div>
                                </div>
                                    <div className='row rant-content'>
                                        {this.state.rantBeingViewed === rant._id
                                        ? (
                                            <div className='container'>
                                                <div className='row thumb-body'>
                                                    {rant.gif !== undefined
                                                    ? (
                                                        <div className='thumbnail-cont large-4 columns'>
                                                            <img src={rant.gif} alt="Rant Thumbnail"/>
                                                        </div>
                                                    )
                                                    : (
                                                        <div></div>
                                                    )
                                                    }
                                                    <div className='large-8 columns'>
                                                        <h4 className='text'>Rant:</h4>
                                                        <p className='text'>{rant.body}</p>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='comments large-12 columns '>
                                                        <h4 className='text'>Comments:</h4>
                                                        {rant.comments.map((comment) => {
                                                            return (
                                                                <div key={comment._id} className='comment text row'>
                                                                {this.state.currentUser._id == comment.user
                                                                    ? (
                                                                        <div className='users-comment'>
                                                                            <div className='large-10 columns'>
                                                                                <p>comment: {comment.body}</p>
                                                                            </div>
                                                                            <div className='large-2 columns'>
                                                                                <button onClick={this.onDeleteClick.bind(this, rant._id, comment._id)}>X</button>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                    : (
                                                                        <div className='large-12 columns'>
                                                                            {comment.body !== null
                                                                            ? (
                                                                                <div className='comment-show'>
                                                                                    <p>comment: {comment.body}</p>
                                                                                </div>
                                                                            )
                                                                            : (
                                                                                <div></div>
                                                                            )
                                                                            }   
                                                                        </div>
                                                                    )
                                                                }
                                                                </div>
                                                            )
                                                        })
                                                        }
                                                    </div>
                                                </div>
                                                <div className='row rant-action-btns'>
                                                        <div className='large-4 columns'>
                                                            <button className='button radius' onClick={this.onLikeClick.bind(this, rant._id)}>Like</button>
                                                        </div>
                                                        <div className='large-4 columns'>
                                                            <button className='button radius' onClick={this.onCommentClick.bind(this, rant._id)}>Comment</button>
                                                        </div>
                                                        <div className='large-4 columns'>
                                                            {this.state.currentUser._id === rant.user
                                                            ? (
                                                                <Link className='button radius' to={`/editrant/${rant._id}`}>Edit Rant</Link>
                                                            )
                                                            : (
                                                                <div></div>
                                                            )
                                                            }
                                                        </div>
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

                            <div className='home-explore-div bottom-explore'>
                                <Link to='/explore' className='explore-btn button radius'>Explore More Rants!</Link>
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

export default RecentRants