import React from 'react'
import axios from 'axios'
import clientAuth from '../../clientAuth'
import GiphySelect from 'react-giphy-select'
import 'react-giphy-select/lib/styles.css'

class EditRant extends React.Component {

    state = {
        currentUser: clientAuth.getCurrentUser(),
        fields: {
            title: '',
            category: '',
            body: '',
            commentsEnabled: true,
            likes: 0,
            gif: null,
            public: true          
        }, 
        mounted: false
    }

    componentDidMount() {
        const id = this.props.match.params.id
        console.log(this.props)
        // could also do const { id } = this.props.match.params
        axios({
            method: 'get',
            url: `/api/rants/${id}`
        }).then((res) => {
            console.log(res.data)
            this.setState({
                fields: {
                    title: res.data.title,
                    category: res.data.category,
                    body: res.data.body
                }, 
                mounted: true
            })
        })
    }

    onSubmitClick(evt, id) {
        evt.preventDefault()
        const rantId = this.props.match.params.id
        console.log(this.state.fields)
        axios({
            method: 'patch',
            url: `/api/rants/${rantId}`,
            data: this.state.fields
        }).then((res) => {
            console.log(res.data)
            this.setState({
                fields: res.data
            })
            this.props.history.push('/profile')
        })
    }

    onInputChange(evt) {
        this.setState({
            fields: {
                ...this.state.fields,
                [evt.target.name]: evt.target.value
            }
        })
    }

    onGifClick(evt) {
        evt.preventDefault()
        this.setState({ gifClicked: !this.state.gifClicked })
    }

    onGifSelect(gifData) {
        console.log(gifData.images.fixed_width.url)
        this.setState({
            fields: {
                ...this.state.fields,
                gif: gifData.images.fixed_width.url
            }
        })
    }

    onDeleteClick(evt, id) {
        evt.preventDefault()
        const rantId = this.props.match.params.id
        axios({
            method: 'delete',
            url: `/api/rants/${rantId}`
        }).then((res) => {
            this.props.history.push('/profile')
            console.log('Deleted that rant')
        })
    }


    render() {
        if (this.state.mounted === false) {
            return (
                <div>
                    Loading...
                </div>
            )
        }
        else {
            return (
                <div className='EditProfile'>
                    <h1 className='left-spacing'>Edit Rant: {this.state.fields.title}</h1>
                    {/* below adding the onChange will add that method to all of the form */}
                    <div className='row'>
                        <div className='large-8 columns'>
                            <form className='rant-form' onChange={this.onInputChange.bind(this)} onSubmit={(evt) => evt.preventDefault()}>
                            <div className='row'>
                                <input type="text" placeholder="Title" name='title' />
                            </div>
                            <div className='row'>
                                <input type="text" placeholder="Category" name='category' />
                            </div>
                            <div className='row'>
                                <input className='rant-body' type="textarea" placeholder="Rant it up" name='body' />
                            </div>
                            <div className='row gif-search-div text'>
                                Have some fun with it...
                            </div>
                            <div className='row gif-search-input' >
                                <div className='large-4 columns'>
                                    <button onClick={this.onGifClick.bind(this)} className='button round' >Add Gif</button>
                                </div>
                                {this.state.gifClicked
                                ? (
                                    <div className='large-12 columns'>
                                        <GiphySelect className='gif-selector' onEntrySelect={this.onGifSelect.bind(this)}/>
                                    </div>
                                )
                                : (
                                    <div></div>
                                )
                                }
                            </div>
                            {/* In addition, would need ability for user to switch
                            On and off public and comments */}
                            <div className='row new-rant-submit center'>
                                <button onClick={this.onSubmitClick.bind(this)} className='edit-rant top-spacing' type="submit">Update Rant</button>
                            </div>
                        </form>
                    </div>
                    <div className='large-4 columns'>
                        <img className='rant-image' src="https://goo.gl/FBtd2h" alt="Rant photo"/>
                    </div>
                </div>
                <div className='row rant-delete'>
                    <button onClick={this.onDeleteClick.bind(this)} className='button delete-btn' type="submit">Delete Rant</button>
                </div>
                </div>
            )
        }
    }
}

export default EditRant