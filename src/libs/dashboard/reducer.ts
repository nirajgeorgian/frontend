import { createReducer } from 'typesafe-actions'

import initialDashboardState from 'libs/dashboard/state'
import { initializeDashboardAsync, fetchDashboardAsync, filterDashboardOnTimestamp } from 'libs/dashboard/action'

export const dashboardReducer = createReducer(initialDashboardState)
	.handleAction([initializeDashboardAsync.request, initializeDashboardAsync.failure], (state) =>
		state.set('initialized', false)
	)
	.handleAction(initializeDashboardAsync.success, (state) => state.set('initialized', true))
	.handleAction(fetchDashboardAsync.request, (state) => state.set('loading', true))
	.handleAction(fetchDashboardAsync.success, (state, action: any) =>
		state.set('dashboard', action.payload).set('loading', false)
	)
	.handleAction(fetchDashboardAsync.failure, (state, action: any) =>
		state.set('error', action.payload.message).set('loading', false)
	)
	.handleAction(filterDashboardOnTimestamp.request, (state) => state.set('loading', true))
	.handleAction(filterDashboardOnTimestamp.success, (state, action: any) =>
		state.set('dashboard', action.payload).set('loading', false)
	)
	.handleAction(filterDashboardOnTimestamp.failure, (state, action: any) =>
		state.set('error', action.payload.message).set('loading', false)
	)

export default dashboardReducer
export type DashboardState = ReturnType<typeof dashboardReducer>
