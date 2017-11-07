import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './foundation.min.css'

import App from './App'
//import Foundation from 'react-foundation'

ReactDOM.render(
	<Router><App /></Router>,
	document.getElementById('root')
)