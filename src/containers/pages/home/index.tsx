import React from 'react'

import Banner from 'containers/pages/home/banner'
import Page from 'containers/pages/home/page'
import ResponsiveContext from 'containers/context/responsive'

class Home extends React.PureComponent<{}, {}> {
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
					<Page />
				</div>
			</div>
		)
	}
}

export default Home
