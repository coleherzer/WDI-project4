import React from 'react'

const Home = (props) => {
	return (
		<div className='Home'>
			<div className="home-container">
				<h1>Welcome to Ranter</h1>
				<h5>Ranter is a web-based application that allows users to vent about nearly any topic in order to help 
					them get certain thoughts and emotions off their chest.</h5>
			</div>

			<div className="home-rants">
				<h3>Recent Rants</h3>
				<h5>Search by Category</h5>
			</div>
		</div>
	)
}

export default Home