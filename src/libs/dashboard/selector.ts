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
		(dashboardLoading, dashboardInitialized, dashboardError, dashboard) => ({
			dashboardLoading,
			dashboardInitialized,
			dashboardError,
			dashboard
		})
	)

export { makeSelectDashboard, makeSelectionDashboard }
export default makeSelectionDashboard
