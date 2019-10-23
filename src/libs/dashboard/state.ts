import { Record } from 'immutable'

export interface IDasshboardData {
	AppstoreUrl: string
	OS: string
	PubId: string
	Source: string
	IP: string
	Pixel: string
	Advertiser: string
	Timestamp: string
	Campaign: string
	Size: string
	X: string
	Y: string
	Id: string
}

export interface IDashboardState {
	initialized: boolean
	loading: boolean
	error: string | null
	dashboard: Array<IDasshboardData> | null
}

export const IInitialDashboardState = Record<IDashboardState>({
	initialized: false,
	loading: false,
	error: null,
	dashboard: null
})

const initialDashboardState = new IInitialDashboardState()

export default initialDashboardState
export type AuthState = typeof initialDashboardState
