import React from 'react'
import Result from 'antd/lib/result'
import Button from 'antd/lib/button'

export const NotFound: React.FC = () => (
	<Result
		status="404"
		title="404"
		subTitle="Sorry, the page you visited does not exist."
		extra={<Button type="primary">Back Home</Button>}
	/>
)

export default NotFound
