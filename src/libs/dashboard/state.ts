import { Record } from 'immutable'

export interface IDasshboardData {
	AppstoreUrl: string
	OS: string
	PubId: string
	Source: string
	IP: string
	Pixel: boolean
	Advertiser: string
	Timestamp: string
	Campaign: string
	Size: string
	X: number
	Y: number
	Id: string
}

export interface IDashboardMetadata {
	DisplayClick: string
	CenterX: number
	CenterY: number
	Emails: string
	Zoom: number
	AlertEmail: boolean
	AlertSMS: boolean
	MinimumAcceptableImpressions: number
	Id: string
	Company: string
	DisplayImpressions: boolean
	Active: boolean
	RetargetClick: boolean
	Name: string
}

export interface IDashboardState {
	initialized: boolean
	loading: boolean
	error: string | null
	dashboard: Array<IDasshboardData> | null
	dashboardMetadata: IDashboardMetadata | null
}

export const IInitialDashboardState = Record<IDashboardState>({
	initialized: false,
	loading: false,
	error: null,
	dashboard: null,
	dashboardMetadata: null
})

const initialDashboardState = new IInitialDashboardState()

export default initialDashboardState
export type AuthState = typeof initialDashboardState
