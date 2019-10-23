import React from 'react'
import Table from 'antd/lib/table'

const columns = [
	{
		title: 'Source',
		dataIndex: 'source',
		key: 'source'
	},
	{
		title: 'Application',
		dataIndex: 'application',
		key: 'application'
	},
	{
		title: 'Os',
		dataIndex: 'os',
		key: 'os'
	},
	{
		title: 'Size',
		dataIndex: 'size',
		key: 'size'
	}
]

export interface IImpressionTable {
	key: string
	source: string
	application: string
	os: string
	size: string
}
interface _IImpressionTableProps {
	data: Array<IImpressionTable>
	loading: boolean
}

const ImpressionTable: React.FC<_IImpressionTableProps> = ({ data, loading }) => {
	return (
		<div>
			<Table loading={loading} columns={columns} dataSource={data} />
		</div>
	)
}

export default ImpressionTable
