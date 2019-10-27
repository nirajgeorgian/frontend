import React, { Component } from 'react'
import moment from 'moment'
import { IDasshboardData, IDashboardMetadata } from 'libs/dashboard/state'
import makeSelectionDashboard from 'libs/dashboard/selector'
import { Dispatch, bindActionCreators, compose } from 'redux'
import { RootAction } from 'typesafe-actions'
import {
	initializeDashboardAsync,
	fetchDashboardAsync,
	filterDashboardOnTimestamp,
	fetchDashboardMetadataAsync
} from 'libs/dashboard/action'
import { connect } from 'react-redux'
import styles from 'containers/pages/dashboard/style.module.less'
import FilterScetion from 'components/dashboard/filter-section'
import { Formik } from 'formik'
import MyMapComponent from 'components/dashboard/heat-map'
import { IGetDashboard, IGetFilterDashboard, IGetDashboardMetadata } from 'libs/dashboard/api'
import ImpressionTable, { IImpressionTable } from 'components/dashboard/impression-table'

interface _IDashboardProps {
	dashboardInitialized: boolean
	dashboardLoading: boolean
	dashboardError: string | null
	dashboardMetadata: IDashboardMetadata | null
	dashboard: Array<IDasshboardData> | null
	dashboardRunningOperation: Array<string>
	isMarkerShown: boolean
	initialize: (value: boolean) => void
	getDashboard: (value: IGetDashboard) => void
	fetchDashboardMetadata: (value: IGetDashboardMetadata) => void
	filterDashboard: (value: IGetFilterDashboard) => void
}
interface _IDashboardState {
	timestamp: [moment.Moment, moment.Moment] | null
	dashboard: Array<IDasshboardData> | null
	os?: string
	source?: string
	size?: string
}
interface _ICalculatePrice {
	positions: Array<{ lat: number; lng: number }>
}
interface _IDashboardFilter {
	timestamp: [moment.Moment, moment.Moment] | null
	os?: string
	source?: string
	size?: string
}

class Dashboard extends Component<_IDashboardProps, _IDashboardState> {
	state = {
		timestamp: null,
		dashboard: this.props.dashboard,
		os: 'all',
		source: 'all',
		size: 'all'
	}

	componentDidMount = () => {
		this.props.initialize(true)
	}

	getSnapshotBeforeUpdate = (prevProps: _IDashboardProps) => {
		const prevPropsDashboard = prevProps.dashboard ? prevProps.dashboard : []
		const currentPropsDashboard = this.props.dashboard ? this.props.dashboard : []

		if (prevPropsDashboard.length !== currentPropsDashboard.length) {
			this.setState({ dashboard: currentPropsDashboard })
		}

		return null
	}

	componentDidUpdate = (prevProps: _IDashboardProps) => {
		if (!prevProps.dashboardInitialized && this.props.dashboardInitialized) {
			this.props.getDashboard({ campaign: 'BHV_RETARGETING_US' })
			this.props.fetchDashboardMetadata({ id: 'BHV', name: 'BHV_RETARGETING_US' })
		}
	}

	calculateLatLng = (input: Array<IDasshboardData>): _ICalculatePrice => {
		const positions: Array<{ lat: number; lng: number; weight?: number }> = []
		if (input.length) {
			input.map((x) => {
				positions.push({ lat: x.X, lng: x.Y })

				return true
			})
		}

		return { positions }
	}

	onFilterSubmit = (values: _IDashboardFilter) => {
		const { timestamp, os, source, size } = values

		// validate os, source and size
		if (os && os !== 'all') {
			this.setState({ os })
		}

		if (source && source !== 'all') {
			this.setState({ source })
		}

		if (size && size !== 'all') {
			this.setState({ size })
		}

		if (timestamp) {
			const startdate = timestamp[0].unix()
			const enddate = timestamp[1].unix()
			const newTimestamp = this.state.timestamp
			if (newTimestamp) {
				const startDate = newTimestamp[0] as moment.Moment
				const endDate = newTimestamp[1] as moment.Moment
				if (!startDate.isSame(timestamp[0]) && endDate.isSame(timestamp[1])) {
					this.setState({ timestamp: [timestamp[0], timestamp[1]] })
					this.props.filterDashboard({ timestamp: [startdate, enddate], campaign: 'BHV_RETARGETING_US' })
				}
			} else {
				this.setState({ timestamp: [timestamp[0], timestamp[1]] })
				this.props.filterDashboard({ timestamp: [startdate, enddate], campaign: 'BHV_RETARGETING_US' })
			}
		}
	}

	onFilterImpressionTable = (values: Array<IDasshboardData>): Array<IImpressionTable> => {
		const impressionDashboardData = values.map((x) => {
			const tableObject = {
				key: x.Id,
				source: x.Source,
				application: x.AppstoreUrl,
				os: x.OS,
				size: x.Size
			}

			return tableObject
		})

		return impressionDashboardData
	}

	render = () => {
		const { dashboardLoading, dashboardMetadata, dashboardRunningOperation } = this.props
		const { dashboard } = this.state
		const { os, size, source, timestamp } = this.state
		let filteredDashboard: Array<IDasshboardData> = dashboard || []

		if (filteredDashboard.length > 0) {
			const { os, source, size } = this.state
			let filterObject: any = {}

			// os filter
			if (os && os !== 'all') {
				const newFilterObject = {
					OS: os,
					...filterObject
				}
				filterObject = newFilterObject
			}

			// source filter
			if (source && source !== 'all') {
				const newFilterObject = {
					Source: source,
					...filterObject
				}
				filterObject = newFilterObject
			}

			// size filter
			if (size && size !== 'all') {
				const newFilterObject = {
					Size: size,
					...filterObject
				}
				filterObject = newFilterObject
			}

			Object.keys(filterObject).forEach((x: any) => {
				const _dashboard: Array<IDasshboardData> = filteredDashboard.filter((y: any) => {
					return y[x] === filterObject[x]
				})
				filteredDashboard = _dashboard
			})
		}

		const { positions } = filteredDashboard.length > 0 ? this.calculateLatLng(filteredDashboard) : { positions: null }
		const impressionDashboard = filteredDashboard.length > 0 ? this.onFilterImpressionTable(filteredDashboard) : []

		const { CenterX, CenterY } = dashboardMetadata
			? { CenterX: dashboardMetadata.CenterX, CenterY: dashboardMetadata.CenterY }
			: { CenterX: 0, CenterY: 0 }
		const center = { lat: CenterX, lng: CenterY }
		const zoom = dashboardMetadata ? dashboardMetadata.Zoom : 15

		return (
			<div>
				{dashboardLoading && dashboardRunningOperation.length !== 0 ? null : (
					<MyMapComponent isMarkerShown={true} data={{ positions, center, zoom }} />
				)}
				<div className={styles.filter}>
					<Formik
						initialValues={{ os, size, timestamp, source }}
						onSubmit={this.onFilterSubmit}
						render={FilterScetion}
					/>
					<ImpressionTable loading={dashboardLoading} data={impressionDashboard} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = makeSelectionDashboard
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
	return bindActionCreators(
		{
			initialize: initializeDashboardAsync.request,
			getDashboard: fetchDashboardAsync.request,
			filterDashboard: filterDashboardOnTimestamp.request,
			fetchDashboardMetadata: fetchDashboardMetadataAsync.request
		},
		dispatch
	)
}
const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)

export default compose(withConnect)(Dashboard)
