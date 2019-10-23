import { createSelector } from 'reselect'
import { AppState } from 'containers/app/reducer'
import { RootState, StateType } from 'typesafe-actions'
import { Record } from 'immutable'
import { initialAppRecord } from 'containers/app/state'

/**
 * Direct selector to the app state
 */
type AppRootState = RootState & Record<StateType<typeof initialAppRecord>>
const createAppDomain = (iState: AppRootState): AppState => iState.get('app')

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
