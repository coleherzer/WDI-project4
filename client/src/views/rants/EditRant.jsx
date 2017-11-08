import React from 'react'
import axios from 'axios'

class EditRant extends React.Component {

    state = {
        fields: {
            title: '',
            category: '',
            body: ''            
        }, 
        mounted: false
    }

    componentDidMount() {
        const id = this.props.match.params.id
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

    onFormSubmit(evt, id) {
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
        // const post = this.state.post

        // console.log(this.props)
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
                    <h1>Edit Rant: {this.state.fields.title}</h1>
                    {/* below adding the onChange will add that method to all of the form */}
                    <form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
                        <input type="text" defaultValue={this.state.fields.title} name="title"/>
                        <input type="text" defaultValue={this.state.fields.category} name='category'/>
                        <input type="test" defaultValue={this.state.fields.body} name='body'/>
                        <button type="submit">Edit Rant</button>
                    </form>
                </div>
            )
        }
    }
}

export default EditRant