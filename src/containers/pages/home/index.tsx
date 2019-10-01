import React from 'react'

import Banner from './Banner'
import Page2 from './Page2'
import ResponsiveContext from 'containers/context/responsive'

class Home extends React.PureComponent {
	static contextType = ResponsiveContext

	state = {
		isMobile: false
	}

	componentWillMount = () => {
		const { isMobile } = this.context
		if (isMobile) {
			this.setState({ isMobile: true })
		} else {
			this.setState({ isMobile: false })
		}
	}

	render() {
		const { isMobile } = this.state
		return (
			<div>
				<div className="home-wrapper">
					<Banner isMobile={isMobile} />
					<Page2 />
				</div>
			</div>
		)
	}
}

export default Home
