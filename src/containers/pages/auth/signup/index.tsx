import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Spin, Icon, Divider, Button } from 'antd'

import styles from 'containers/pages/auth/style.module.less'
import { Formik, FormikActions } from 'formik'
import SignupForm from 'components/auth/signup'
import { Auth } from 'aws-amplify'
import { ISignUpResult } from 'amazon-cognito-identity-js'
import SigninConfirmForm from 'components/auth/confirm'
import AppContext from 'containers/context/app'
import Message from 'components/message'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

interface _IAuthSigniupState {
	email: string
	username: string
	password: string
	confirmPassword: string
	signedUp: boolean
	signedUpUser: ISignUpResult | null
	message?: string
	loading?: boolean
	error?: Error
}
interface _IAuthConfirmationCode {
	confirmationCode: string
}

class Signup extends Component<RouteComponentProps, _IAuthSigniupState> {
	static contextType = AppContext

	readonly state = {
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
		signedUp: false,
		signedUpUser: null,
		message: undefined,
		loading: false,
		error: undefined
	}

	onFormSubmit = async (values: _IAuthSigniupState, __: FormikActions<_IAuthSigniupState>) => {
		const { email, username, password, confirmPassword } = values
		if (password !== confirmPassword) {
			this.setState({ error: new Error("Password didn't matched") })
		} else {
			this.setState({ loading: true })
			try {
				const signedUpUser = await Auth.signUp({
					username,
					password,
					attributes: { email }
				})
				this.setState({
					loading: false,
					signedUp: true,
					signedUpUser,
					username,
					password,
					email,
					error: undefined,
					message: 'signedup successfully. please check your mail for confirmation code'
				})
			} catch (error) {
				if (error.code === 'InvalidParameterException') {
					this.setState({
						loading: false,
						error: new Error("password didn't match the required constraint."),
						message: ''
					})
				} else {
					this.setState({ loading: false, error, message: '' })
				}
			}
		}
	}

	onSigninConfirmSubmit = async (values: _IAuthConfirmationCode) => {
		this.setState({ loading: true, message: 'we are confirming and signing you in.' })
		const { username, password } = this.state
		const { confirmationCode } = values
		const { setAuthenticated } = this.context
		try {
			await Auth.confirmSignUp(username, confirmationCode)
			await Auth.signIn(username, password)
			setAuthenticated(true)
			this.setState({ loading: false })
			this.props.history.push('/dashboard')
		} catch (error) {
			this.setState({ loading: false, error, message: '' })
			setAuthenticated(false)
		}
	}

	onErrorClose = () => {
		this.setState({ error: undefined, message: '' })
	}

	render = () => {
		const { error }: { error: unknown } = this.state
		const { signedUpUser, message, loading } = this.state
		const err = error as Error

		return (
			<div className={styles.circle_auth}>
				<Helmet>
					<title>Auth | Signup</title>
					<meta name="description" content="Signup for AdsFlight" />
				</Helmet>
				<div className={styles.circle_auth_form}>
					<Spin indicator={antIcon} spinning={loading}>
						<h2 className="st-form-center">Signup AdsFlight</h2>
						{err && !message && (
							<Message
								message="Signup Error"
								description={err && err.message.split(':').join('. ')}
								type="error"
								onClose={this.onErrorClose}
							/>
						)}
						{message && !err && <Message message="Signup success" description={message} type="success" />}
						{signedUpUser ? (
							<Formik
								initialValues={{ confirmationCode: '' }}
								onSubmit={this.onSigninConfirmSubmit}
								render={SigninConfirmForm}
							/>
						) : (
							<Formik initialValues={this.state} onSubmit={this.onFormSubmit} render={SignupForm} />
						)}
						<Divider />
						<div className={styles.form_metadata_label}>
							<strong>Already have a account ?</strong>
						</div>
						<Link to="/signin">
							<Button className={styles.form_metadata_button} block={true} size="large" htmlType="submit">
								signin
							</Button>
						</Link>
					</Spin>
				</div>
			</div>
		)
	}
}

export default Signup
