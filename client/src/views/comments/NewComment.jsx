import React from 'react'
import axios from 'axios'

class NewRant extends React.Component {

    state = {
        fields: {
            body: ''
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
                <h3>Rant About It</h3>

                {/* form for a new rant */}
                <form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
                    <input type="text" placeholder="Title" name='title' />
                    <input type="text" placeholder="Category" name='category' />
                    <input type="text" placeholder="Rant it up" name='body' />
                    {/* In addition, would need ability for user to switch
                    On and off public and comments */}
                    <button type="submit">Rant it</button>
                </form>


            </div>
        )
    }
}

export default NewRant