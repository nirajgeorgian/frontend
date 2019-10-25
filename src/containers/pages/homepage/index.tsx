import React, { Component } from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'

class Homepage extends Component<{}, {}> {
	render = () => {
		return (
			<div>
				<div className="stayology-stays">
					<Row>
						<Col span={6}>col-12</Col>
						<Col span={6}>col-12</Col>
					</Row>
				</div>
			</div>
		)
	}
}

export default Homepage
