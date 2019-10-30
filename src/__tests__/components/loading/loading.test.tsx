import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PageLoading from 'components/loading/page'

test('loading of loading component', () => {
	const { container, getByText } = render(<PageLoading />)
	console.log(container)
	expect(getByText(/loading/)).toBeInTheDocument()
	expect(container).toMatchSnapshot()
})
