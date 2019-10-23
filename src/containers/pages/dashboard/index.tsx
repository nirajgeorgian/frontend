import React, { Component } from 'react'
import moment from 'moment'
import { IDasshboardData } from 'libs/dashboard/state'
import makeSelectionDashboard from 'libs/dashboard/selector'
import { Dispatch, bindActionCreators, compose } from 'redux'
import { RootAction } from 'typesafe-actions'
import { initializeDashboardAsync, fetchDashboardAsync, filterDashboardOnTimestamp } from 'libs/dashboard/action'
import { connect } from 'react-redux'
import styles from 'containers/pages/dashboard/style.module.less'
import FilterScetion from 'components/dashboard/filter-section'
import { Formik } from 'formik'
import MyMapComponent from 'components/dashboard/heat-map'
import { IGetDashboard, IGetFilterDashboard } from 'libs/dashboard/api'
import ImpressionTable, { IImpressionTable } from 'components/dashboard/impression-table'

interface _IDashboardProps {
	dashboardInitialized: boolean
	dashboardLoading: boolean
	dashboardError: string | null
	dashboard: Array<IDasshboardData> | null
	isMarkerShown: boolean
	initialize: (value: boolean) => void
	getDashboard: (value: IGetDashboard) => void
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
	center: { lat: number; lng: number }
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
		os: undefined,
		source: undefined,
		size: undefined
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
		}
	}

	calculateLatLng = (input: Array<IDasshboardData>): _ICalculatePrice => {
		const positions: Array<{ lat: number; lng: number; weight: number }> = []
		let lat = 0
		let lng = 0
		if (input.length) {
			input.map((x) => {
				positions.push({ lat: parseFloat(x.X), lng: parseFloat(x.Y), weight: 8 })
				lat += parseFloat(x.X)
				lng += parseFloat(x.Y)

				return true
			})
		}

		return { positions, center: { lat: lat / input.length - 1, lng: lng / input.length - 1 } }
	}

	onFilterSubmit = (values: _IDashboardFilter) => {
		const { timestamp, os, source, size } = values

		// validate os, source and size
		if (os) {
			this.setState({ os })
		}

		if (source) {
			this.setState({ source })
		}

		if (size) {
			this.setState({ size })
		}

		if (timestamp) {
			const startdate = timestamp[0].unix()
			const enddate = timestamp[1].unix()
			this.setState({ timestamp: [timestamp[0], timestamp[1]] })
			this.props.filterDashboard({ timestamp: [startdate, enddate], campaign: 'BHV_RETARGETING_US' })
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
		const { dashboardLoading } = this.props
		const { dashboard } = this.state
		let filteredDashboard: Array<IDasshboardData> = dashboard || []

		if (filteredDashboard.length > 0) {
			const { os, source, size } = this.state
			let filterObject: any = {}

			// os filter
			if (os) {
				const newFilterObject = {
					OS: os,
					...filterObject
				}
				filterObject = newFilterObject
			}

			// source filter
			if (source) {
				const newFilterObject = {
					Source: source,
					...filterObject
				}
				filterObject = newFilterObject
			}

			// size filter
			if (size) {
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

		const { positions, center } =
			filteredDashboard.length > 0
				? this.calculateLatLng(filteredDashboard)
				: { positions: null, center: { lat: 59.95, lng: 30.33 } }
		const impressionDashboard = filteredDashboard.length > 0 ? this.onFilterImpressionTable(filteredDashboard) : []

		return (
			<div>
				{!dashboardLoading && <MyMapComponent isMarkerShown={true} data={{ positions, center }} />}
				<div className={styles.filter}>
					<Formik initialValues={this.state} onSubmit={this.onFilterSubmit} render={FilterScetion} />
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
			filterDashboard: filterDashboardOnTimestamp.request
		},
		dispatch
	)
}
const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)

export default compose(withConnect)(Dashboard)
