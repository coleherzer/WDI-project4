import React from 'react'
import axios from 'axios'
import clientAuth from '../../clientAuth'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

class RecentRants extends React.Component {
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

            // order rants by most recent
            this.setState({
                rants: this.state.rants.sort(function(a,b) {
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

    onSearchSubmit() {
        console.log('search attempted')
    }

    render() {
        if(this.state.rants) {
            return (
                <div className='RecentRants'>
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
                                                    <div className='large-3 columns'>
                                                        <h6>{rant.body}</h6>
                                                        {/* also going to need to display rant comments here */}
                                                    </div>
                                                    <div className='large-3 columns'>
                                                        <button onClick={this.onLikeClick.bind(this, rant._id)}>Like</button>
                                                    </div>
                                                    <div className='large-3 columns'>
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
                                                    <div className='large-3 columns'>
                                                        {this.state.currentUser._id === rant.user
                                                        ? (
                                                            <Link to={`/editrant/${rant._id}`}>Edit Rant</Link>
                                                        )
                                                        : (
                                                            <div></div>
                                                        )
                                                        }
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

                            <div className='row home-explore-div'>
                                <button className='explore-btn'>Explore More Rants!</button>
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