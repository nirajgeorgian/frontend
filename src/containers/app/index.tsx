import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators, Dispatch, compose } from 'redux'
import { connect } from 'react-redux'
import { RootAction } from 'typesafe-actions'

import AppRoutes from 'containers/app/routes'
import AppFooter from 'containers/layout/footer'
import AppHeader from 'containers/layout/header'
import { makeSelectionApp } from 'containers/app/selector'
import { initializeAppAsync } from 'containers/app/action'
import appEpics from 'containers/app/epic'
import { epic$ } from 'store/root-epic'
import injectReducer from 'utils/inject-reducer'
import appReducer from 'containers/app/reducer'

interface _IAppProps {
	appInitialized: boolean
	appLoading: boolean
	appError: string | null
	initialize: () => void
}

class App extends Component<_IAppProps, {}> {
	componentDidMount = () => {
		epic$.next(appEpics)
		this.props.initialize()
	}

	render = () => {
		return (
			<div className="App">
				<AppHeader />
				<AppRoutes />
				<AppFooter />
			</div>
		)
	}
}

const mapStateToProps = makeSelectionApp
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
	return bindActionCreators(
		{
			initialize: initializeAppAsync.request
		},
		dispatch
	)
}
const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)
const withReducer = injectReducer({ key: 'app', reducer: appReducer })

export default compose(
	withReducer,
	withConnect,
	withRouter
)(App)
