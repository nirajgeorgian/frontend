import { createSelector } from 'reselect'
import { RootState } from 'typesafe-actions'

/**
 * Direct selector to the auth state
 */
const createAuthDomain = (state: RootState) => state.auth

/**
 * Other specific selectors
 */
export const selectLoading = createSelector(
	createAuthDomain,
	(iDomain) => iDomain.get('loading')
)
export const selectInitializing = createSelector(
	createAuthDomain,
	(iDomain) => iDomain.get('loading')
)
export const selectError = createSelector(
	createAuthDomain,
	(iDomain) => iDomain.get('error')
)
const makeSelectAuth = () =>
	createSelector(
		createAuthDomain,
		(iSubstate) => iSubstate.toJS()
	)
const makeSelectionAuth = () =>
	createSelector(
		selectLoading,
		selectInitializing,
		selectError,
		(authLoading, authInitialized, authError) => ({
			authLoading,
			authInitialized,
			authError
		})
	)

export { makeSelectAuth, makeSelectionAuth }
export default makeSelectionAuth
