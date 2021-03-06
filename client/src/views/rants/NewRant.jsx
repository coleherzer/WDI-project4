import React from 'react'
import axios from 'axios'
import GiphySelect from 'react-giphy-select'
import 'react-giphy-select/lib/styles.css'

class NewRant extends React.Component {

    state = {
        fields: {
            title: '',
            category: '',
            body: '',
            commentsEnabled: true,
            likes: 0,
            gif: null,
            public: true
        },
        gifClicked: false
    }

    onSubmitClick(evt) {
        evt.preventDefault()
        console.log(this.state.fields)
        axios({
            method: 'post',
            url: '/api/rants',
            data: this.state.fields
        }).then((res) => {
            console.log(res.data)
            this.setState({
                fields: res.data
            })
            // a built in prop with react router, here we are pushing a new route
            // to the history of the app, basically redirecting
            this.props.history.push('/profile')
        })
    }

    onInputChange(evt) {
        this.setState({
            fields: {
                ...this.state.fields,
                // using brackets below it will figure out which target name is being changed
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

    render() {
        return (
            <div className='NewRant'>
                <div className='row'>
                    <h1 className='text'>Rant About It</h1>
                </div>

                {/* form for a new rant */}
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
                    <div className='row new-rant-submit'>
                        <button onClick={this.onSubmitClick.bind(this)} className='add-rant' type="submit">Rant it</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default NewRant