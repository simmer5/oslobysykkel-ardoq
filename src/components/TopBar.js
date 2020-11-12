import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike'

const useStyles = makeStyles(theme =>
	createStyles({
		root: {
			flexGrow: 1,
			height: '9vh',
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
	})
)

const TopBar = () => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						edge='start'
						className={classes.menuButton}
						color='inherit'
						aria-label='menu'
					>
						<DirectionsBikeIcon />
					</IconButton>
					<Typography variant='h6' className={classes.title}>
						Oslo sykkel monitor
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	)
}
export default TopBar
