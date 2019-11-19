import React from 'react'
import { Form, Field, FormikValues } from 'formik'

import { AntInput, AntPassword } from 'components/ui/form-field'
import { isRequired, validateEmail } from 'components/ui/validate-field'
import Button from 'antd/lib/button'
import styles from 'components/auth/style.module.less'

const SignupForm = (props: FormikValues) => {
	const { values } = props

	return (
		<Form className="form-container">
			<Field
				component={AntInput}
				placeholder="Enter your email"
				value={values.email || ''}
				onChange={props.handleChange}
				simple={true}
				name="email"
				type="email"
				label="Email"
				icon="user"
				validate={validateEmail}
				hasFeedback
			/>
			<Field
				component={AntInput}
				placeholder="Enter your username"
				value={values.username || ''}
				onChange={props.handleChange}
				simple={true}
				name="username"
				type="text"
				label="Username"
				icon="user"
				validate={isRequired}
				hasFeedback
			/>
			<Field
				component={AntPassword}
				placeholder="Enter your password"
				value={values.password || ''}
				onChange={props.handleChange}
				simple={true}
				name="password"
				type="password"
				label="Password"
				icon="lock"
				validate={isRequired}
				hasFeedback
			/>
			<Field
				component={AntPassword}
				placeholder="Confirm your password"
				value={values.confirmPassword || ''}
				onChange={props.handleChange}
				simple={true}
				name="confirmPassword"
				type="password"
				label="Confirm Password"
				icon="lock"
				validate={isRequired}
				hasFeedback
			/>
			<div className={styles.circle_submit_container}>
				<Button block={true} size="large" type="primary" htmlType="submit">
					signup
				</Button>
			</div>
		</Form>
	)
}

export default SignupForm
