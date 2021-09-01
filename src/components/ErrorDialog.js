import { DialogTitle, DialogActions, Dialog, DialogContent, Typography, Button } from '@material-ui/core'
import { SentimentDissatisfiedRounded } from '@material-ui/icons'
import React from 'react'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    dialog: {
        width: 300
    },
    dialogTitle: {
        textAlign: 'center',
        maxHeight: 65
    },
    dialogContent: {
        textAlign: 'center',
        paddingBottom: theme.spacing(3)
    },
    dialogAction: {
        justifyContent: 'center',
        backgroundColor: theme.palette.error.main
    },
    titleIcon: {
        color: theme.palette.error.main,
        fontSize: 32
    },
    button: {
      color: theme.palette.white,
      maxHeight: 20
    }
}))

export default function ErrorDialog(props) {

    const classes = useStyles()

    return(
        <Dialog open={props.open} dir='rtl'  classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
                <SentimentDissatisfiedRounded className={classes.titleIcon}/>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography style={{
                    
                }} variant='h6'>
                    {props.header}
                </Typography>
                <Typography>
                    {props.error}
                </Typography>
            </DialogContent>
            <DialogActions  className={classes.dialogAction}>
                <Button fullWidth className={classes.button} onClick={props.close}>
                    סגור
                </Button>
            </DialogActions>
        </Dialog>
    )
}