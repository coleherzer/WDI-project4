import React from 'react'
import RecentRants from './rants/RecentRants'
import { Link } from 'react-router-dom'

const Home = (props) => {
	return (
		<div className='Home'>
			<div className="home-container">
				<div className='row'>
					<div className='large-4 columns'>
						<img src="https://goo.gl/GMRPL7" alt="Ranter Logo" className='logo' />
					</div>
					<div className='large-8 columns'>
						<div className='welcome'>
							<h1 className='welcome-header'>Welcome to Ranter</h1>
							<hr/>
							<h5 className='welcome-header'>Ranter is a web-based application that allows users to vent about nearly any topic in order to help 
								them get certain thoughts and emotions off their chest.</h5>
						</div>
					</div>
				</div>
			</div>

			<div className='row'>
				<div className='large-8 columns recent-rants-heading'>
					<h2 className='text'>Recent Rants: </h2>
				</div>
				<div className='large-4 columns explore-right'>
					<Link to='/explore' className='explore-btn button radius'>Explore More Rants!</Link>
				</div>
				<hr className='color-hr'/>
			</div>
				<div className='recent-rants'>
					<RecentRants component={RecentRants}/>
				</div>
		</div>
	)
}

export default Home