import { BehaviorSubject } from 'rxjs'
import { mergeMap } from 'rxjs/internal/operators/mergeMap'
import { combineEpics, ActionsObservable, StateObservable } from 'redux-observable'

import authEpics from 'libs/auth/epic'
import { RootState, RootAction } from 'typesafe-actions'

export const epic$ = new BehaviorSubject(combineEpics(authEpics))
export const rootEpic = (
	action$: ActionsObservable<RootAction>,
	state$: StateObservable<RootState>,
	dependencies: any
) => epic$.pipe(mergeMap((epic) => epic(action$, state$, dependencies)))
export default rootEpic