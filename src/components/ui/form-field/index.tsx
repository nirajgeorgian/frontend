import React from 'react'
import { AutoComplete, DatePicker, Form, Input, TimePicker, Select, Radio, Icon } from 'antd'
import { FieldProps } from 'formik/dist/Field'
import { FormItemProps } from 'antd/lib/form/FormItem'
import { FormikProps } from 'formik'

const FormItem = Form.Item
const { Option } = Select

interface _ICreateAntAntFieldProps extends FieldProps, FormItemProps {
	type: string
	icon: string
	radioOptions?: Array<string>
	selectOptions?: Array<string>
	submitCount: number
}
const CreateAntField = (AntComponent: React.ComponentType<any>): React.FC<_ICreateAntAntFieldProps> => ({
	field,
	form,
	hasFeedback,
	label,
	icon,
	selectOptions,
	radioOptions,
	submitCount,
	type,
	...props
}): React.ReactElement => {
	const touched = form.touched[field.name]
	const submitted = submitCount > 0

	const hasError = form.errors[field.name]
	const submittedError = hasError && submitted
	const touchedError = hasError && touched

	const onInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
		form.setFieldValue(field.name, value)
	const onChange = (value: FormikProps<any>) => form.setFieldValue(field.name, value)
	const onBlur = () => form.setFieldTouched(field.name, true)

	const renderOption = (option: string) => {
		return <Option key={option}>{option}</Option>
	}

	const renderRadio = (radio: string) => {
		return (
			<Radio key={radio} value={radio}>
				{radio}
			</Radio>
		)
	}
	const selectOptionsRender = selectOptions ? selectOptions.map(renderOption) : null
	const radioOptionsRender = radioOptions ? radioOptions.map(renderRadio) : null

	return (
		<div className="field-container">
			<FormItem
				className={props.className ? props.className : ''}
				label={label}
				hasFeedback={!!((hasFeedback && submitted) || (hasFeedback && touched))}
				help={submittedError || touchedError ? hasError : false}
				validateStatus={submittedError || touchedError ? 'error' : 'success'}>
				{selectOptionsRender && (
					<AntComponent
						{...field}
						{...props}
						type={type}
						autoComplete="off"
						onBlur={onBlur}
						onChange={type ? onInputChange : onChange}>
						{selectOptionsRender}
					</AntComponent>
				)}
				{radioOptionsRender && (
					<AntComponent
						{...field}
						{...props}
						type={type}
						autoComplete="off"
						onBlur={onBlur}
						onChange={type ? onInputChange : onChange}>
						{radioOptionsRender}
					</AntComponent>
				)}
				<AntComponent
					prefix={icon ? <Icon type={icon} /> : null}
					{...field}
					{...props}
					size="large"
					type={type}
					autoComplete="off"
					onBlur={onBlur}
					onChange={type ? onInputChange : onChange}
				/>
			</FormItem>
		</div>
	)
}

export const AntSelect = CreateAntField(Select)
export const AntDatePicker = CreateAntField(DatePicker)
export const AntDateRangePicker = CreateAntField(DatePicker.RangePicker)
export const AntInput = CreateAntField(Input)
export const AntPassword = CreateAntField(Input.Password)
export const AntTimePicker = CreateAntField(TimePicker)
export const AntRadio = CreateAntField(Radio.Group)
export const AntAutoComplete = CreateAntField(AutoComplete)
