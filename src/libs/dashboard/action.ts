import { createAsyncAction } from 'typesafe-actions'
import {
	INITIALIZE,
	INITIALIZE_SUCCESS,
	INITIALIZE_FAILURE,
	FETCH_DASHBOARD_DATA,
	FETCH_DASHBOARD_DATA_SUCCESS,
	FETCH_DASHBOARD_DATA_FAILURE,
	FILTER_DASHBOARD_TIMESTAMP,
	FILTER_DASHBOARD_TIMESTAMP_SUCCESS,
	FILTER_DASHBOARD_TIMESTAMP_FAILURE
} from 'libs/dashboard/constant'
import { IDasshboardData } from 'libs/dashboard/state'
import { IGetFilterDashboard, IGetDashboard } from './api'

export const initializeDashboardAsync = createAsyncAction(INITIALIZE, INITIALIZE_SUCCESS, INITIALIZE_FAILURE)<
	boolean,
	boolean,
	Error
>()

export const fetchDashboardAsync = createAsyncAction(
	FETCH_DASHBOARD_DATA,
	FETCH_DASHBOARD_DATA_SUCCESS,
	FETCH_DASHBOARD_DATA_FAILURE
)<IGetDashboard, Array<IDasshboardData> | null, Error>()

export const filterDashboardOnTimestamp = createAsyncAction(
	FILTER_DASHBOARD_TIMESTAMP,
	FILTER_DASHBOARD_TIMESTAMP_SUCCESS,
	FILTER_DASHBOARD_TIMESTAMP_FAILURE
)<IGetFilterDashboard, Array<IDasshboardData> | null, Error>()
