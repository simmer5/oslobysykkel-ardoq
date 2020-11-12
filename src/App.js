import React, { useState, useEffect } from 'react'

import axios from 'axios'

import './App.css'
import TopBar from './components/TopBar'
import InfoModal from './components/Modal'
import Map from './components/Map'
import MarkerBike from './components/Marker'

function App() {
	const [stations, setStations] = useState([])
	const [status, setStatus] = useState([])
	const [currentStatus, setCurrentStatus] = useState([])

	const [open, setOpen] = useState(false)
	const [stationData, setStationData] = useState([])

	useEffect(() => {
		axios
			.get(
				`https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json`,
				{
					headers: { 'Client-Identifier': 'ms-kodeoppgave' },
				}
			)
			.then(res => {
				//console.log('===== res Log  =====', res)
				setStations(res.data.data.stations)
			})
			.catch(err => {
				console.log('Data fetch error ', err)
			})
	}, [])
	useEffect(() => {
		axios
			.get(
				`https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json`,
				{
					headers: { 'Client-Identifier': 'ms-kodeoppgave' },
				}
			)
			.then(res => {
				//console.log('===== res Log STATUS  =====', res.data.data.stations)
				setStatus(res.data.data.stations)
			})
			.catch(err => {
				console.log('Data fetch error ', err)
			})
	}, [])

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
			<TopBar />
			<InfoModal
				open={open}
				handleClose={handleClose}
				name={stationData.name}
				address={stationData.address}
				capacity={stationData.capacity}
				bikesAvailable={currentStatus.num_bikes_available}
				docksAvailable={currentStatus.num_docks_available}
			/>
			<Map stations={stations}>
				{stations.map(station => (
					<MarkerBike
						key={station.station_id}
						lat={station.lat}
						lng={station.lon}
						handleMarkerClick={e => {
							setStationData(station)
							const currStat = status.find(
								({ station_id }) => station_id === station.station_id
							)
							setCurrentStatus(currStat)
							setOpen(true)
						}}
					/>
				))}
			</Map>
		</>
	)
}
export default App
