import React from 'react'
import { Form, Field, FormikValues } from 'formik'
import Button from 'antd/lib/button'

import { AntInput, AntPassword } from 'components/ui/form-field'
import { isRequired } from 'components/ui/validate-field'
import styles from 'components/auth/style.module.less'

const SigninForm = (props: FormikValues) => {
	const { values } = props

	return (
		<Form className="form-container">
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
				name="password"
				type="password"
				value={values.password || ''}
				simple={true}
				label="Password"
				icon="lock"
				validate={isRequired}
				hasFeedback
			/>
			<div className={styles.circle_submit_container}>
				<Button block={true} size="large" type="primary" htmlType="submit">
					signin
				</Button>
			</div>
		</Form>
	)
}

export default SigninForm
