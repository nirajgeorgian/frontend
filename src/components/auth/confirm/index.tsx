import React from 'react'
import { Form, Field, FormikValues } from 'formik'
import Button from 'antd/lib/button'

import { AntInput } from 'components/ui/form-field'
import { isRequired } from 'components/ui/validate-field'
import styles from 'components/auth/style.module.less'

const SigninConfirmForm = (props: FormikValues) => {
	const { values } = props

	return (
		<Form className="form-container">
			<Field
				component={AntInput}
				placeholder="Confirmation Code"
				value={values.confirmationCode || ''}
				onChange={props.handleChange}
				simple={true}
				name="confirmationCode"
				type="text"
				label="Confirmation Code"
				icon="user"
				validate={isRequired}
				hasFeedback
			/>
			<div className={styles.circle_submit_container}>
				<Button block={true} size="large" type="primary" htmlType="submit">
					confirm
				</Button>
			</div>
		</Form>
	)
}

export default SigninConfirmForm
