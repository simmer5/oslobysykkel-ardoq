import React from 'react'

import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme =>
	createStyles({
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		paper: {
			backgroundColor: '#272C34',
			borderRadius: 5,
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 2, 3),
			color: '#9e9e9e',
			border: 'none',
		},
	})
)

const InfoModal = ({
	open,
	handleClose,
	name,
	address,
	capacity,
	bikesAvailable,
	docksAvailable,
}) => {
	const classes = useStyles()
	return (
		<>
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
						<h3 id='transition-modal-title'>{name}</h3>
						<p id='transition-modal-description'>
							Address: {address}
							<br />
							Capacity: {capacity}
							<br />
							Available Bicycles: {bikesAvailable}
							<br />
							Available Docks: {docksAvailable}
						</p>
					</div>
				</Fade>
			</Modal>
		</>
	)
}

export default InfoModal
