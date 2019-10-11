import { createSelector } from 'reselect'
import { RootState } from 'typesafe-actions'

/**
 * Direct selector to the app state
 */
const createAppDomain = (state: RootState) => state.get('app')

/**
 * Other specific selectors
 */
export const selectLoading = createSelector(
	createAppDomain,
	(iDomain) => iDomain.get('loading')
)
export const selectInitializing = createSelector(
	createAppDomain,
	(iDomain) => iDomain.get('loading')
)
export const selectError = createSelector(
	createAppDomain,
	(iDomain) => iDomain.get('error')
)
const makeSelectApp = () =>
	createSelector(
		createAppDomain,
		(iSubstate) => iSubstate.toJS()
	)
const makeSelectionApp = () =>
	createSelector(
		selectLoading,
		selectInitializing,
		selectError,
		(appLoading, appInitialized, appError) => ({
			appLoading,
			appInitialized,
			appError
		})
	)

export { makeSelectApp, makeSelectionApp }
export default makeSelectionApp
