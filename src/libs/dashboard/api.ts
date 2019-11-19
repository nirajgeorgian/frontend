import { IDashboardData, IDashboardMetadata } from 'libs/dashboard/state'

interface _IGetDashboardMetadataResponse {
	result: IDashboardMetadata | null
}

export interface IGetDashboard {
	campaign: string
}
export interface IGetDashboardMetadata {
	id: string
	name: string
}
export interface IGetFilterDashboard {
	timestamp: [number, number]
	campaign: string
}
export interface IDashboardResponse {
	results: Array<IDashboardData>
	lastEvaluatedKey: {
		Id: string
	}
	scannedCount: number
	count: number
}
class DashboardAPi {
	static getDashboard = ({ campaign }: IGetDashboard): Promise<IDashboardResponse> => {
		const { REACT_APP_DASHBOARD_URI } = process.env

		return fetch(`${REACT_APP_DASHBOARD_URI}/dashboard/${campaign}`).then(async (response) => {
			const data: IDashboardResponse = await response.json()

			return data
		})
	}

	static getDashboardMetadata = (): Promise<_IGetDashboardMetadataResponse> => {
		const { REACT_APP_DASHBOARD_URI } = process.env

		return fetch(`${REACT_APP_DASHBOARD_URI}/metadata/BHV/BHV_RETARGETING_US`).then((response) => response.json())
	}

	static getTimestampDashboard = ({ timestamp, campaign }: IGetFilterDashboard): Promise<IDashboardResponse> => {
		const { REACT_APP_DASHBOARD_URI } = process.env

		return fetch(`${REACT_APP_DASHBOARD_URI}/dashboard/${campaign}/${timestamp[0]}/${timestamp[1]}`).then((response) =>
			response.json()
		)
	}
}

export default DashboardAPi
