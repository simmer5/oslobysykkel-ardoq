import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme =>
	createStyles({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			'& > *': {
				margin: theme.spacing(1),
				width: theme.spacing(26),
				height: theme.spacing(12),
			},
			position: 'absolute',
			top: '80px',
			zIndex: 1,
			opacity: 0.8,
		},
		paper: {
			backgroundColor: '#000000',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-start',
			justifyContent: 'center',
			paddingLeft: '2rem',
			paddingRight: '2rem',
			width: 'fit-content',
		},
		text: {
			color: '#b5b5b5',
			marginTop: '.5rem',
			marginBottom: '.5rem',
			fontSize: ' 0.8rem',
		},
	})
)

export default function SimplePaper({ totalFreeBikes, totalFreeDocks }) {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Paper className={classes.paper} elevation={3}>
				<h4 className={classes.text}>Available Bikes: {totalFreeBikes}</h4>
				<h4 className={classes.text}>Free Racks: {totalFreeDocks}</h4>
			</Paper>
		</div>
	)
}
