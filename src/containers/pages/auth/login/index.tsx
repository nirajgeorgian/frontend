import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { makeSelectionAuth } from 'libs/auth/selector'
import { initializeAsync } from 'libs/auth/action'
import { RootAction } from 'typesafe-actions'

const mapStateToProps = makeSelectionAuth
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
	bindActionCreators(
		{
			initialize: initializeAsync.request
		},
		dispatch
	)

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class Login extends Component<Props> {
	componentWillMount = () => {
		this.props.initialize()
	}

	render() {
		return <div>welcome to login page</div>
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)
