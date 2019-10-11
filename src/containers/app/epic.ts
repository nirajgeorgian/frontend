import { Epic, combineEpics } from 'redux-observable'
import { filter, mapTo } from 'rxjs/operators'
import { RootAction, RootState, isActionOf } from 'typesafe-actions'
import { initializeAsync } from 'containers/app/action'

export const initializeEpic$: Epic<RootAction, RootAction, RootState> = (action$) =>
	action$.pipe(
		filter(isActionOf(initializeAsync.request)),
		mapTo(initializeAsync.success())
	)

export default combineEpics(initializeEpic$)
