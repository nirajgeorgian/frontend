import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ImpressionTable from 'components/dashboard/impression-table'

test("display's no data when the data is empty", () => {
	const { getByText } = render(<ImpressionTable data={[]} loading={false} />)

	expect(getByText('No Data')).toBeInTheDocument()
})

test("display's data", () => {
	const { getByText } = render(
		<ImpressionTable
			data={[
				{
					key: '1',
					source: 'web',
					application: '12345',
					os: 'ios',
					size: '300x250'
				}
			]}
			loading={false}
		/>
	)

	expect(getByText('web')).toBeInTheDocument()
	expect(getByText('ios')).toBeInTheDocument()
	expect(getByText('300x250')).toBeInTheDocument()
})
