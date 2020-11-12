import React, { useState, useEffect } from 'react'

import axios from 'axios'
import BikeIcon from '@material-ui/icons/DirectionsBike'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import './App.css'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const { REACT_APP_API_KEY } = process.env

const useStyles = makeStyles(theme =>
	createStyles({
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			border: '2px solid #000',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
	})
)
const containerStyle = {
	width: '100vw',
	height: '100vh',
}
const options = {
	// styles: mapStyles,
	disableDefaultUI: true,
	zoomControl: false,
}

const center = {
	lat: 59.9139,
	lng: 10.7522,
}

function App() {
	const [stations, setStations] = useState([])
	const [status, setStatus] = useState([])
	const [currentStatus, setCurrentStatus] = useState([])
	const classes = useStyles()
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
			<BikeIcon />

			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<h2 id='transition-modal-title'>{stationData.name}</h2>
						<p id='transition-modal-description'>
							{stationData.address}
							<br />
							{stationData.capacity}
							<br />
							{currentStatus.num_bikes_available}
							<br />
							{currentStatus.num_docks_available}
						</p>
					</div>
				</Fade>
			</Modal>
			<LoadScript googleMapsApiKey={REACT_APP_API_KEY}>
				<GoogleMap
					mapContainerStyle={containerStyle}
					options={options}
					center={center}
					zoom={13}
				>
					{/* Child components, such as markers, info windows, etc. */}
					<>
						{stations.map(station => (
							<Marker
								key={station.station_id}
								position={{ lat: +`${station.lat}`, lng: +`${station.lon}` }}
								icon={{
									url: `/bike.svg`,
								}}
								onClick={e => {
									setStationData(station)
									const currStat = status.find(
										({ station_id }) => station_id === station.station_id
									)
									setCurrentStatus(currStat)
									setOpen(true)
								}}
							/>
						))}
					</>
				</GoogleMap>
			</LoadScript>
		</>
	)
}
export default App
