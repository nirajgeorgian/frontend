import React from 'react'
import { Form, Field } from 'formik'

import { AntInput } from 'components/ui/form-field'
import { isRequired, validateEmail } from 'components/ui/validate-field'
import Button from 'antd/lib/button'
import styles from 'components/auth/style.module.less'

const SignupForm = () => {
	return (
		<Form className="form-container">
			<Field
				component={AntInput}
				name="Description"
				type="text"
				label="Full Name"
				icon="user"
				validate={isRequired}
				hasFeedback
			/>
			<Field
				component={AntInput}
				name="Username"
				type="text"
				label="Username"
				icon="user"
				validate={isRequired}
				hasFeedback
			/>
			<Field
				component={AntInput}
				name="Email"
				type="email"
				label="Email"
				icon="user"
				validate={validateEmail}
				hasFeedback
			/>
			<Field
				component={AntInput}
				name="PasswordHash"
				type="password"
				label="Password"
				icon="lock"
				validate={isRequired}
				hasFeedback
			/>
			<div className={styles.circle_submit_container}>
				<Button type="primary" htmlType="submit" className="login-form-button">
					signup
				</Button>
			</div>
		</Form>
	)
}

export default SignupForm
