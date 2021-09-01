import { DialogTitle, DialogActions, Dialog, DialogContent, Typography, Button } from '@material-ui/core'
import { SentimentSatisfiedOutlined } from '@material-ui/icons'
import React from 'react'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    dialog: {
        width: 300
    },
    dialogTitle: {
        textAlign: 'center',
    },
    dialogContent: {
        textAlign: 'center',
        paddingBottom: theme.spacing(3)
    },
    dialogAction: {
        justifyContent: 'center',
        backgroundColor: '#e3b8be'
    },
    titleIcon: {
        color: '#e3b8be',
        fontSize: 32
    },
    button: {
      color: theme.palette.white,
      maxHeight: 20
    }
}))

export default function SuccessDialog(props) {

    const classes = useStyles()

    return(
        <Dialog open={props.open} dir='rtl'  classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
                <SentimentSatisfiedOutlined className={classes.titleIcon}/>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant='h6'>
                    {props.header}
                </Typography>
                <Typography >
                    {props.message}
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