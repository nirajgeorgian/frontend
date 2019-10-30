import { createSelector } from 'reselect'
import { RootState } from 'typesafe-actions'

/**
 * Direct selector to the auth state
 *
 * @param state
 */
const createAuthDomain = (state: RootState) => state.get('auth')

/**
 * Other specific selectors
 */
export const selectLoading = createSelector(
	createAuthDomain,
	(iDomain) => iDomain.get('loading')
)
export const selectInitializing = createSelector(
	createAuthDomain,
	(iDomain) => iDomain.get('initialized')
)
export const selectError = createSelector(
	createAuthDomain,
	(iDomain) => iDomain.get('error')
)
export const selectToken = createSelector(
	createAuthDomain,
	(iDomain) => iDomain.get('token')
)
export const selectRunningOperations = createSelector(
	createAuthDomain,
	(iDomain) => iDomain.get('runningOperations').toJS()
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
		selectToken,
		selectRunningOperations,
		(authLoading, authInitialized, authError, authToken, authRunningOperations) => ({
			authLoading,
			authInitialized,
			authError,
			authToken,
			authRunningOperations
		})
	)

export { makeSelectAuth, makeSelectionAuth }
export default makeSelectionAuth
