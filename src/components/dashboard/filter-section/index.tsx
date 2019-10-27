import React from 'react'
import { AntDateRangePicker, AntSelect } from 'components/ui/form-field'
import Button from 'antd/lib/button'
import { Field, Form } from 'formik'
import styles from 'components/dashboard/style.module.less'
import { isRequired } from 'components/ui/validate-field'

const OsSelectOptions: Array<string> = ['all', 'android', 'iOS']
const SourceSelectOptions: Array<string> = ['all', 'app', 'web']
const SizeSelectOptions: Array<string> = ['all', '320x50', '300x250', '728x90', '320x480']

const FilterScetion = () => {
	return (
		<Form className={`${styles.form_container} ant-form-inline`}>
			<Field
				component={AntDateRangePicker}
				name="timestamp"
				label="timestamp"
				size="default"
				validate={isRequired}
				hasFeedback
				className={styles.inline_form}
			/>
			<Field
				component={AntSelect}
				name="os"
				size="default"
				label="os"
				style={{ width: 200 }}
				placeholder="Choose an OS"
				selectOptions={OsSelectOptions}
				hasFeedback
				className={styles.inline_form}
			/>
			<Field
				component={AntSelect}
				name="source"
				size="default"
				label="source"
				style={{ width: 200 }}
				placeholder="Choose an Source"
				selectOptions={SourceSelectOptions}
				hasFeedback
				className={styles.inline_form}
			/>
			<Field
				component={AntSelect}
				name="size"
				size="default"
				label="size"
				style={{ width: 200 }}
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
