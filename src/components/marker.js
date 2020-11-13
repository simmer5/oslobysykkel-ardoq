import React from 'react'
import { Marker } from '@react-google-maps/api'

const MarkerBike = ({ lat, lng, handleMarkerClick }) => {
	return (
		<>
			<Marker
				// key={key}
				position={{ lat: +`${lat}`, lng: +`${lng}` }}
				icon={{
					url: `/bike.svg`,
				}}
				onClick={handleMarkerClick}
			/>
		</>
	)
}

export default MarkerBike
