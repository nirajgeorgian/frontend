import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Formik, FormikActions } from 'formik'
import { Spin, Icon, Divider, Button } from 'antd'
import { Auth } from 'aws-amplify'

import SigninForm from 'components/auth/signin'
import styles from 'containers/pages/auth/style.module.less'
import AppContext from 'containers/context/app'
import Message from 'components/message'
import Helmet from 'react-helmet'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

interface _IAuthSigninstate {
	username: string
	password: string
	loading?: boolean
	error?: Error
}

class Signin extends Component<RouteComponentProps, _IAuthSigninstate> {
	static contextType = AppContext

	readonly state = {
		username: '',
		password: '',
		loading: false,
		error: undefined
	}

	onErrorClose = () => {
		this.setState({ error: undefined })
	}

	onFormSubmit = async (values: _IAuthSigninstate, __: FormikActions<_IAuthSigninstate>) => {
		const { setAuthenticated } = this.context
		this.setState({ loading: true })
		try {
			await Auth.signIn(values.username, values.password)
			setAuthenticated(true)
			this.setState({ loading: false })
			this.props.history.push('/dashboard')
		} catch (error) {
			this.setState({ loading: false, error })
			setAuthenticated(false)
		}
	}

	render = () => {
		const { loading, error }: { loading: boolean; error: unknown } = this.state
		const err = error as Error

		return (
			<div className={styles.circle_auth}>
				<Helmet>
					<title>Auth | Signin</title>
					<meta name="description" content="Signup for AdsFlight" />
				</Helmet>
				<div className={styles.circle_auth_form}>
					<Spin indicator={antIcon} spinning={loading}>
						<h2 className="st-form-center">Signin AdsFlight</h2>
						{err && (
							<Message
								message="Signin Error"
								description={err && err.message}
								type="error"
								onClose={this.onErrorClose}
							/>
						)}
						<Formik initialValues={this.state} onSubmit={this.onFormSubmit} render={SigninForm} />
						<Divider />
						<div className={styles.form_metadata_label}>
							<strong>New to our platform ?</strong>
						</div>
						<Link to="/signup">
							<Button className={styles.form_metadata_button} block={true} size="large" htmlType="submit">
								signup
							</Button>
						</Link>
					</Spin>
				</div>
			</div>
		)
	}
}

export default Signin
