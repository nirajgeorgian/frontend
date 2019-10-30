import React from 'react'

import ResponsiveContext from 'containers/context/responsive'
import Banner from 'containers/pages/home/banner'
import AreasOfImpact from 'containers/pages/home/areas_of_impact'
import WhyJoinCircles from 'containers/pages/home/why_join_circles'
import AboutMetadata from 'containers/pages/home/about_metadata'

class Home extends React.PureComponent {
	static contextType = ResponsiveContext

	state = {
		isMobile: false
	}

	componentDidMount = () => {
		const { isMobile } = this.context
		if (isMobile) {
			this.setState({ isMobile: true })
		} else {
			this.setState({ isMobile: false })
		}
	}

	render = () => {
		const { isMobile } = this.state

		return (
			<div>
				<div className="home-wrapper">
					<Banner isMobile={isMobile} />
					<AboutMetadata />
					<WhyJoinCircles isMobile={isMobile} />
					<AreasOfImpact isMobile={isMobile} />
				</div>
			</div>
		)
	}
}

export default Home
