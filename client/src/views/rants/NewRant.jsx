import React from 'react'
import axios from 'axios'

class NewRant extends React.Component {

    state = {
        fields: {
            title: '',
            category: '',
            body: '',
            commentsEnabled: true,
            likes: 0,
            public: true
        }
    }

    onFormSubmit(evt) {
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

    render() {
        return (
            <div className='NewRant'>
                <div className='row'>
                    <h3>Rant About It</h3>
                </div>

                {/* form for a new rant */}
                <form className='rant-form' onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
                    <div className='row'>
                        <input type="text" placeholder="Title" name='title' />
                    </div>
                    <div className='row'>
                        <input type="text" placeholder="Category" name='category' />
                    </div>
                    <div className='row'>
                        <input type="text" placeholder="Add a gif" name='gif' />
                    </div>
                    <div className='row'>
                        <input className='rant-body' type="textarea" placeholder="Rant it up" name='body' />
                    </div>
                    {/* In addition, would need ability for user to switch
                    On and off public and comments */}
                    <div className='row new-rant-submit'>
                        <button type="submit">Rant it</button>
                    </div>
                </form>


            </div>
        )
    }
}

export default NewRant