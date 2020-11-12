import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

const { REACT_APP_API_KEY } = process.env

const containerStyle = {
	width: '100vw',
	height: '91vh',
}
const options = {
	disableDefaultUI: true,
	zoomControl: false,
}

const center = {
	lat: 59.9139,
	lng: 10.7522,
}

const Map = ({ children }) => {
	return (
		<>
			<LoadScript googleMapsApiKey={REACT_APP_API_KEY}>
				<GoogleMap
					mapContainerStyle={containerStyle}
					options={options}
					center={center}
					zoom={13}
				>
					{/* Child components, such as markers, info windows, etc. */}
					<>{children}</>
				</GoogleMap>
			</LoadScript>
		</>
	)
}

export default Map
