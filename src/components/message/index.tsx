import React from 'react'
import Alert, { AlertProps } from 'antd/lib/alert'

const Message: React.FC<AlertProps> = (props) => {
	return <Alert closable closeText={<strong>Close Now</strong>} {...props} />
}

export default Message
