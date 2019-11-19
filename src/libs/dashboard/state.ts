import { Record, List } from 'immutable'

export interface IDashboardData {
	AppstoreUrl: string
	OS: string
	PubId: string
	Source: string
	IP: string
	Pixel: boolean
	Advertiser: string
	Timestamp: number
	Campaign: string
	Size: string
	X: number
	Y: number
	Id: string
}

export interface IDashboardMetadata {
	DisplayClick: boolean
	CenterX: string
	CenterY: string
	Emails: Array<string>
	Zoom: string
	AlertEmail: boolean
	AlertSMS: boolean
	MinimumAcceptableImpressions: number
	Id: string
	DisplayImpressions: boolean
	Company: string
	Active: boolean
	RetargetClick: boolean
	Name: string
}

export interface IDashboardState {
	initialized: boolean
	loading: boolean
	error: string | null
	dashboard: Array<IDashboardData> | null
	dashboardMetadata: IDashboardMetadata | null
	runningOperations: List<string>
}

export const IInitialDashboardState = Record<IDashboardState>({
	initialized: false,
	loading: false,
	error: null,
	dashboard: null,
	dashboardMetadata: null,
	runningOperations: List([])
})

const initialDashboardState = new IInitialDashboardState()

export default initialDashboardState
export type AuthState = typeof initialDashboardState
