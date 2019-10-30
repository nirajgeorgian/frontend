import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import { compose, bindActionCreators, Dispatch } from 'redux'
import { Typography, Spin, Icon, Divider, Button } from 'antd'

import SignupForm from 'components/auth/signup'
import { makeSelectionAuth } from 'libs/auth/selector'
import { RootAction } from 'typesafe-actions'
import { initializeSigninAsync, IAuthSignin } from 'libs/auth/action'
import styles from 'containers/pages/auth/style.module.less'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

interface _IAuthSignupProps {
	initialize: (value: IAuthSignin) => void
}
interface _IAuthSigniupState {
	name: string
	username: string
	email: string
	password: string
}

class Signup extends Component<_IAuthSignupProps, _IAuthSigniupState> {
	state = {
		name: '',
		username: '',
		email: '',
		password: ''
	}

	onFormSubmit = () => {
		return true
	}

	render = () => {
		return (
			<div className={styles.circle_auth}>
				<Helmet>
					<title>Auth | Signup</title>
					<meta name="description" content="Signup for Stayology" />
				</Helmet>
				<Typography.Title level={2}>Signup Circles</Typography.Title>
				<div className={styles.circle_auth_form}>
					<Spin indicator={antIcon} spinning={false}>
						<Formik initialValues={this.state} onSubmit={this.onFormSubmit} render={SignupForm} />
						<Divider />
						<Link to="/signin">
							<Button type="primary" htmlType="submit" className="login-form-button" block>
								signin
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

export default compose(withConnect)(Signup)
