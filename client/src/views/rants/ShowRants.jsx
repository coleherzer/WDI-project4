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
        filter: 'Enter a Category'
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

    onSearchSubmit(evt) {
        evt.preventDefault()
        console.log('search attempted')

        this.setState({
            filter: evt.target.value
        })

        console.log(this.state.filter)

        this.setState({
            rants: this.state.rants.filter((rant) => {
                return rant.category === this.state.filter
            })
        })

        // evt.target.value = ''
        // console.log(evt.target.value)

        //.map()      Had this .map at the end of the above filter?
    }

    onInputChange(evt) {
        this.setState({
            filter: evt.target.value
        })
    }

    onClearClick(evt) {
        evt.preventDefault()
        console.log('clear')
        axios({
            method: 'get',
            url: '/api/rants'
        }).then((res) => {
            this.setState({
                ...this.state,
                rants: res.data,
                filter: 'Enter a Category'
            })
        })
    }

    render() {
        if(this.state.rants) {
            return (
                <div className='ShowRants'>
                    <div className='row'>
                        <h1>Browse Rants</h1>
                    </div>
                    <div className='row'>
                    <form onSubmit={this.onSearchSubmit.bind(this)} onChange={this.onInputChange.bind(this)}>
                        <input className='search-input radius' defaultValue='' type="text" placeholder={this.state.filter} name='filter'/>
                        <button className='button radius' type='submit'>Search Rants</button>
                        {this.state.filter === 'Enter a Category'
                        ? (
                            <div></div>
                        )
                        : (
                            <button onClick={this.onClearClick.bind(this)} className='clear-search-btn'>Clear Search</button>
                        )
                        }
                    </form>
                    </div>
                    <div className="user-rants row">
                        <h2>Rants:</h2>
                            {this.state.rants.map((rant) => {
                                return (
                                    <div key={rant._id} className='rant row'>
                                        <div className='large-2 columns'>
                                            <h5>
                                                Title: {rant.title}
                                            {/* <Link to={`/posts/${post._id}`}>{rant.title}</Link> */}
                                            </h5>
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