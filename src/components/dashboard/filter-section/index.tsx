import React from 'react'
import { AntDateRangePicker, AntSelect } from 'components/ui/form-field'
import Button from 'antd/lib/button'
import { Field, Form } from 'formik'
import styles from 'components/dashboard/style.module.less'
import { isRequired } from 'components/ui/validate-field'

const OsSelectOptions: Array<string> = ['all', 'android', 'iOS']
const SourceSelectOptions: Array<string> = ['all', 'android', 'ios']
const SizeSelectOptions: Array<string> = ['all', 'android', 'ios']

const FilterScetion = () => {
	return (
		<Form className={styles.form_container}>
			<Field
				component={AntDateRangePicker}
				name="timestamp"
				validate={isRequired}
				hasFeedback
				className={styles.inline_form}
			/>
			<Field
				component={AntSelect}
				name="os"
				placeholder="Choose an OS"
				selectOptions={OsSelectOptions}
				hasFeedback
				className={styles.inline_form}
			/>
			<Field
				component={AntSelect}
				name="source"
				placeholder="Choose an Source"
				selectOptions={SourceSelectOptions}
				hasFeedback
				className={styles.inline_form}
			/>
			<Field
				component={AntSelect}
				name="size"
				placeholder="Choose an Size"
				selectOptions={SizeSelectOptions}
				hasFeedback
				className={styles.inline_form}
			/>
			<Button type="primary" htmlType="submit" className="login-form-button">
				filter
			</Button>
		</Form>
	)
}

export default FilterScetion
