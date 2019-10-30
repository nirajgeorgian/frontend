import React from 'react'
import { Form, Field } from 'formik'
import Button from 'antd/lib/button'

import { AntInput } from 'components/ui/form-field'
import { isRequired } from 'components/ui/validate-field'
import styles from 'components/auth/style.module.less'

const SigninForm = () => {
	return (
		<Form className="form-container">
			<Field
				component={AntInput}
				name="email"
				type="text"
				label="Email"
				icon="user"
				validate={isRequired}
				hasFeedback
			/>
			<Field
				component={AntInput}
				name="password"
				type="password"
				label="Password"
				icon="lock"
				validate={isRequired}
				hasFeedback
			/>
			<div className={styles.circle_submit_container}>
				<Button type="primary" htmlType="submit">
					signin
				</Button>
			</div>
		</Form>
	)
}

export default SigninForm
