import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

import AppRoutes from './routes'
import Footer from 'containers/layout/footer'
import Header from 'containers/layout/header'
import { ResponsiveProvider } from 'containers/context/responsive'

class App extends Component {
	// componentWillMount = () => {
	// 	this.props.initialize();
	// }

	render() {
		return (
			<ResponsiveProvider>
				<div className="App">
					<Header />
					<AppRoutes />
					<Footer />
				</div>
			</ResponsiveProvider>
		)
	}
}

export default App
// const mapDispatchToProps = dispatch => {
// 	return bindActionCreators({
// 		initialize,
// 	}, dispatch)
// }
// const withConnect = connect(
// 	null,
// 	mapDispatchToProps
// )(App)
//
// export default withRouter(
// 	withConnect
// )
