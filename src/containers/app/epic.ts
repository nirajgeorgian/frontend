import { Epic, combineEpics } from 'redux-observable'
import { filter, mapTo } from 'rxjs/operators'
import { RootAction, RootState, isActionOf } from 'typesafe-actions'
import { initializeAppAsync } from 'containers/app/action'

export const initializeEpic$: Epic<RootAction, RootAction, RootState> = (action$) =>
	action$.pipe(
		filter(isActionOf(initializeAppAsync.request)),
		mapTo(initializeAppAsync.success(true))
	)

export default combineEpics(initializeEpic$)
