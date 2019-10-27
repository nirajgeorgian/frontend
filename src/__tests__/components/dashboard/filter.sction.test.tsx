import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Formik } from 'formik'
import FilterScetion from 'components/dashboard/filter-section'

test('display filter section form', () => {
	const initialData = {
		timestamp: null,
		os: 'all',
		source: 'all',
		size: 'all'
	}
	const onSubmit = jest.fn()

	const { getByText } = render(<Formik initialValues={initialData} onSubmit={onSubmit} render={FilterScetion} />)

	expect(getByText('timestamp')).toBeInTheDocument()
	expect(getByText('os')).toBeInTheDocument()
	expect(getByText('source')).toBeInTheDocument()
	expect(getByText('size')).toBeInTheDocument()
})
