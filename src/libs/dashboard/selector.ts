import { createSelector } from 'reselect'
import { RootState } from 'typesafe-actions'

/**
 * Direct selector to the dashboard state
 *
 * @param state
 */
const createDashboardDomain = (state: RootState) => state.get('dashboard')

/**
 * Other specific selectors
 */
export const selectLoading = createSelector(
	createDashboardDomain,
	(iDomain) => iDomain.get('loading')
)
export const selectInitializing = createSelector(
	createDashboardDomain,
	(iDomain) => iDomain.get('initialized')
)
export const selectError = createSelector(
	createDashboardDomain,
	(iDomain) => iDomain.get('error')
)
export const selectDashboard = createSelector(
	createDashboardDomain,
	(iDomain) => iDomain.get('dashboard')
)
export const selectDashboardMetadata = createSelector(
	createDashboardDomain,
	(iDomain) => iDomain.get('dashboardMetadata')
)

const makeSelectDashboard = () =>
	createSelector(
		createDashboardDomain,
		(iSubstate) => iSubstate.toJS()
	)

const makeSelectionDashboard = () =>
	createSelector(
		selectLoading,
		selectInitializing,
		selectError,
		selectDashboard,
		selectDashboardMetadata,
		(dashboardLoading, dashboardInitialized, dashboardError, dashboard, dashboardMetadata) => ({
			dashboardLoading,
			dashboardInitialized,
			dashboardError,
			dashboard,
			dashboardMetadata
		})
	)

export { makeSelectDashboard, makeSelectionDashboard }
export default makeSelectionDashboard
