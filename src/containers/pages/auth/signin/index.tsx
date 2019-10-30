import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose, bindActionCreators, Dispatch } from 'redux'
import { Formik } from 'formik'
import { Spin, Icon, Divider, Button } from 'antd'

import { initializeSigninAsync, IAuthSignin } from 'libs/auth/action'
import { makeSelectionAuth } from 'libs/auth/selector'
import { RootAction } from 'typesafe-actions'
import SigninForm from 'components/auth/signin'
import styles from 'containers/pages/auth/style.module.less'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

interface _IAuthSigninProps {
	initialize: (value: IAuthSignin) => void
	authLoading: boolean
	authInitialized: boolean
	authError: string | null
	authToken: string
	authRunningOperations: Array<string>
}
interface _IAuthSigninstate {
	email: string
	password: string
}

class Signin extends Component<_IAuthSigninProps, _IAuthSigninstate> {
	readonly state = {
		email: '',
		password: ''
	}

	onFormSubmit = () => {
		return true
	}

	render = () => {
		return (
			<div className={styles.circle_auth}>
				<h2 className="st-form-center">Signin Circles</h2>
				<div className={styles.circle_auth_form}>
					<Spin indicator={antIcon} spinning={false}>
						<Formik initialValues={this.state} onSubmit={this.onFormSubmit} render={SigninForm} />
						<Divider />
						<Link to="/signup">
							<Button type="primary" htmlType="submit" className="login-form-button" block>
								signup
							</Button>
						</Link>
					</Spin>
				</div>
			</div>
		)
	}
}

const mapStateToProps = makeSelectionAuth
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
	return bindActionCreators(
		{
			initialize: initializeSigninAsync.request
		},
		dispatch
	)
}
const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)

export default compose(withConnect)(Signin)
