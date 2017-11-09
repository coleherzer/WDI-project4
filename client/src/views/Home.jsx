import React from 'react'
import RecentRants from './rants/RecentRants'

const Home = (props) => {
	return (
		<div className='Home'>
			<div className="home-container">
				<div className='row'>
					<div className='large-4 columns'>
						<img src="https://goo.gl/wnisqt" alt="Ranter Logo" className='logo' />
					</div>
					<div className='large-8 columns'>
						<div className='welcome'>
							<h1>Welcome to Ranter</h1>
							<h5>Ranter is a web-based application that allows users to vent about nearly any topic in order to help 
								them get certain thoughts and emotions off their chest.</h5>
						</div>
					</div>
				</div>
			</div>

			<div className='search-div row'>
				<form>
					<input className='search-input' type="text" placeholder='Search for Rants by Category'/>
					<button type="submit">Search</button>
				</form>
			</div>

			<div className='row'>
				<div className=" large-12 columns home-rants">
					<h3>Recent Rants: </h3>
					<div className='recent-rants'>
						<RecentRants component={RecentRants}/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home