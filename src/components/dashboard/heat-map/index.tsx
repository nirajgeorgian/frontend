import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer'
import withProps from 'recompose/withProps'
import compose from 'recompose/compose'

interface IMyMapComponent {
	isMarkerShown?: boolean
	data: {
		positions: Array<{ lat: number; lng: number; weight?: number }> | null
		center: { lat: number; lng: number }
		zoom: number
	}
}

const MyMapComponent = compose<IMyMapComponent, IMyMapComponent>(
	withProps({
		googleMapURL:
			'https://maps.googleapis.com/maps/api/js?key=AIzaSyC_GOz-jaEKc1wZVrC67hd6jG_YkBjv004&v=3.exp&libraries=visualization,geometry,drawing,places',
		loadingElement: <div style={{ height: '100%' }} />,
		containerElement: <div style={{ height: '400px' }} />,
		mapElement: <div style={{ height: '100%' }} />
	}),
	withScriptjs,
	withGoogleMap
)((props) => {
	const { data } = props
	const { google } = window
	const heatmapData: Array<any> = []

	if (data) {
		if (data.positions) {
			data.positions.map((x) => {
				heatmapData.push({ location: new google.maps.LatLng(x.lat, x.lng), weight: 10 })

				return null
			})
		}
	}

	return (
		<GoogleMap defaultZoom={13} defaultCenter={data.center}>
			{/*
			{props.isMarkerShown && data.positions && data.positions.map((x, i) => (
				<Marker position={x} key={i} />
			))}
			*/}
			<HeatmapLayer data={heatmapData} options={{ dissipating: true, radius: 20, opacity: 1 }} />
		</GoogleMap>
	)
})

export default MyMapComponent
