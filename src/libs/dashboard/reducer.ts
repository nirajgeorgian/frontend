import { createReducer } from 'typesafe-actions'
import {
	FETCH_DASHBOARD_DATA,
	FETCH_DASHBOARD_METADATA_DATA,
	FILTER_DASHBOARD_TIMESTAMP
} from 'libs/dashboard/constant'

import initialDashboardState from 'libs/dashboard/state'
import {
	initializeDashboardAsync,
	fetchDashboardAsync,
	filterDashboardOnTimestamp,
	fetchDashboardMetadataAsync
} from 'libs/dashboard/action'

export const dashboardReducer = createReducer(initialDashboardState)
	.handleAction([initializeDashboardAsync.request, initializeDashboardAsync.failure], (state) =>
		state.set('initialized', false)
	)
	.handleAction(initializeDashboardAsync.success, (state) => state.set('initialized', true))
	.handleAction(fetchDashboardAsync.request, (state, action: any) => {
		let previousRunningOperations = state.get('runningOperations')
		if (!previousRunningOperations.contains(action.type)) {
			previousRunningOperations = previousRunningOperations.push(action.type)
		}

		return state.set('loading', true).set('runningOperations', previousRunningOperations)
	})
	.handleAction(fetchDashboardAsync.success, (state, action: any) => {
		let previousRunningOperations = state.get('runningOperations')
		if (previousRunningOperations.contains(FETCH_DASHBOARD_DATA)) {
			previousRunningOperations = previousRunningOperations.filter((x) => x !== FETCH_DASHBOARD_DATA)
		}

		return state
			.set('dashboard', action.payload)
			.set('loading', false)
			.set('runningOperations', previousRunningOperations)
	})
	.handleAction(fetchDashboardAsync.failure, (state, action: any) => {
		let previousRunningOperations = state.get('runningOperations')
		if (previousRunningOperations.contains(FETCH_DASHBOARD_DATA)) {
			previousRunningOperations = previousRunningOperations.filter((x) => x !== FETCH_DASHBOARD_DATA)
		}

		return state
			.set('error', action.payload.message)
			.set('loading', false)
			.set('runningOperations', previousRunningOperations)
	})
	.handleAction(filterDashboardOnTimestamp.request, (state, action: any) => {
		let previousRunningOperations = state.get('runningOperations')
		if (!previousRunningOperations.contains(action.type)) {
			previousRunningOperations = previousRunningOperations.push(action.type)
		}

		return state.set('loading', true).set('runningOperations', previousRunningOperations)
	})
	.handleAction(filterDashboardOnTimestamp.success, (state, action: any) => {
		let previousRunningOperations = state.get('runningOperations')
		if (previousRunningOperations.contains(FILTER_DASHBOARD_TIMESTAMP)) {
			previousRunningOperations = previousRunningOperations.filter((x) => x !== FILTER_DASHBOARD_TIMESTAMP)
		}

		return state
			.set('dashboard', action.payload)
			.set('loading', false)
			.set('runningOperations', previousRunningOperations)
	})
	.handleAction(filterDashboardOnTimestamp.failure, (state, action: any) => {
		let previousRunningOperations = state.get('runningOperations')
		if (previousRunningOperations.contains(FILTER_DASHBOARD_TIMESTAMP)) {
			previousRunningOperations = previousRunningOperations.filter((x) => x !== FILTER_DASHBOARD_TIMESTAMP)
		}

		return state
			.set('error', action.payload.message)
			.set('loading', false)
			.set('runningOperations', previousRunningOperations)
	})
	.handleAction(fetchDashboardMetadataAsync.request, (iState, action: any) => {
		let previousRunningOperations = iState.get('runningOperations')
		if (!previousRunningOperations.contains(action.type)) {
			previousRunningOperations = previousRunningOperations.push(action.type)
		}

		return iState.set('loading', true).set('runningOperations', previousRunningOperations)
	})
	.handleAction(fetchDashboardMetadataAsync.success, (iState, action: any) => {
		let previousRunningOperations = iState.get('runningOperations')
		if (previousRunningOperations.contains(FETCH_DASHBOARD_METADATA_DATA)) {
			previousRunningOperations = previousRunningOperations.filter((x) => x !== FETCH_DASHBOARD_METADATA_DATA)
		}

		return iState
			.set('dashboardMetadata', action.payload)
			.set('loading', false)
			.set('runningOperations', previousRunningOperations)
	})
	.handleAction(fetchDashboardMetadataAsync.failure, (iState, action: any) => {
		let previousRunningOperations = iState.get('runningOperations')
		if (previousRunningOperations.contains(FETCH_DASHBOARD_METADATA_DATA)) {
			previousRunningOperations = previousRunningOperations.filter((x) => x !== FETCH_DASHBOARD_METADATA_DATA)
		}

		return iState
			.set('error', action.payload.message)
			.set('loading', false)
			.set('runningOperations', previousRunningOperations)
	})

export default dashboardReducer
export type DashboardState = ReturnType<typeof dashboardReducer>
