import { Epic, combineEpics } from 'redux-observable'
import { filter, mapTo } from 'rxjs/operators'
import { RootAction, RootState, isActionOf } from 'typesafe-actions'
import { initializeAuthAsync } from 'libs/auth/action'

export const initializeEpic$: Epic<RootAction, RootAction, RootState> = (action$) =>
	action$.pipe(
		filter(isActionOf(initializeAuthAsync.request)),
		mapTo(initializeAuthAsync.success())
	)

export default combineEpics(initializeEpic$)
