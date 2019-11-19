import { from, of } from 'rxjs'
import { Epic, combineEpics } from 'redux-observable'
import { catchError, map, switchMap, filter, mapTo } from 'rxjs/operators'
import { RootAction, RootState, isActionOf } from 'typesafe-actions'
import {
	initializeDashboardAsync,
	fetchDashboardAsync,
	filterDashboardOnTimestamp,
	fetchDashboardMetadataAsync
} from 'libs/dashboard/action'
import DashboardAPi from 'libs/dashboard/api'

export const initializeDashboardEpic$: Epic<RootAction, RootAction, RootState> = (action$) =>
	action$.pipe(
		filter(isActionOf(initializeDashboardAsync.request)),
		mapTo(initializeDashboardAsync.success(true))
	)

export const fetchDashboardEpic$: Epic<RootAction, RootAction, RootState> = (action$) =>
	action$.pipe(
		filter(isActionOf(fetchDashboardAsync.request)),
		switchMap((action) =>
			from(DashboardAPi.getDashboard(action.payload)).pipe(
				map(({ results }) => fetchDashboardAsync.success(results)),
				catchError((error) => of(fetchDashboardAsync.failure(error)))
			)
		)
	)

export const fetchDashboardMetadataEpic$: Epic<RootAction, RootAction, RootState> = (action$) =>
	action$.pipe(
		filter(isActionOf(fetchDashboardMetadataAsync.request)),
		switchMap(() =>
			from(DashboardAPi.getDashboardMetadata()).pipe(
				map(({ result }) => fetchDashboardMetadataAsync.success(result)),
				catchError((error) => of(fetchDashboardMetadataAsync.failure(error)))
			)
		)
	)

export const filterDashboardTimestampEpic$: Epic<RootAction, RootAction, RootState> = (action$) =>
	action$.pipe(
		filter(isActionOf(filterDashboardOnTimestamp.request)),
		switchMap((action) =>
			from(DashboardAPi.getTimestampDashboard(action.payload)).pipe(
				map(({ results }) => filterDashboardOnTimestamp.success(results)),
				catchError((error) => of(filterDashboardOnTimestamp.failure(error)))
			)
		)
	)

export default combineEpics(
	initializeDashboardEpic$,
	fetchDashboardEpic$,
	filterDashboardTimestampEpic$,
	fetchDashboardMetadataEpic$
)
