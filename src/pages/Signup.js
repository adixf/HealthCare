import API                 from '../api'
import ErrorDialog         from '../components/ErrorDialog'
import SuccessDialog       from '../components/SuccessDialog'
import { makeStyles }      from '@material-ui/core/styles'
import React, { useState } from 'react'
import { 
    Container, TextField, Typography, Grid, Button, Paper, Tabs, Tab 
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4),
        opacity: '100%'
    },
    submit: {
      marginTop: theme.spacing(3),
    },
    tab: {
        minWidth: 90
    }
}))


export default function Signup(props) {
    const classes = useStyles()
    const history = useHistory()

    const initialDialogState = {
        open: false,
        header: '',
        message: ''
    }

    const [errorDialog, setErrorDialog] = useState(initialDialogState)
    const [successDialog, setSuccessDialog] = useState(initialDialogState)

    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        userType: "volunteer"
    })

    const [userAddress, setUserAddress] = useState({
        city: '',
        street: '',
        numOfBuilding: 0,
    })

    const inputChanged = (key, value) => {
        setUserDetails(state => ({
            ...state,
            [key]: value
        }))
    }

    const addressChanged = (key, value) => {
        setUserAddress(state => ({
            ...state,
            [key]: value
        }))
    }


    const signup = async () => {

        if(Object.values(userDetails).some(val => val === '') || Object.values(userAddress).some(val => val === '')) {
            console.log("hi");
            return setErrorDialog({
                open: true,
                header: "שכחת משהו.",
                message: 'אנא מלא את כל השדות'
            })
        }

        if((await API.validAddress(userAddress.city, userAddress.street, userAddress.numOfBuilding)) === false) {
            return setErrorDialog({
                open: true,
                header: "משהו השתבש.",
                message: "הכתובת שהזנת לא קיימת"
            }) 
        }

        if(await API.userExists(userDetails.email)) {
            return setErrorDialog({
                open: true,
                header: "משהו השתבש.",
                message: 'המשתמש כבר קיים במערכת'
            })
        }

        const {lat, lng} = await API.getLonLat(userAddress.city, userAddress.street, userAddress.numOfBuilding)

        await API.signup({
            ...userDetails,
            address: {
                ...userAddress,
                lat,
                lon: lng
            }
        })


        return setSuccessDialog({
            open: true,
            header: "ברוך הבא!",
            message: "נוספת למערכת בהצלחה"
        })
    }

    return(
        <Container component='main' maxWidth='sm' >
            <ErrorDialog
                open={errorDialog.open} 
                error={errorDialog.message} 
                header={errorDialog.header}
                close={() => setErrorDialog({open: false, header: '', message: ''})}
            />
            <SuccessDialog
                open={successDialog.open} 
                message={successDialog.message} 
                header={successDialog.header}
                close={() => {
                    setSuccessDialog({open: false, header: '', message: ''})
                    history.push('/')
                }}
            />
            <Paper className={classes.paper}>
                
                <Typography component='h1' variant='h5' style={{
                    fontFamily: 'Heebo'
                }}>
                    הרשמה
                </Typography>
                <form className={classes.form} dir='rtl'>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField     
                                variant='outlined'
                                margin='normal'
                                fullWidth                              
                                label='שם פרטי'
                                autoFocus   
                                value={userDetails.firstName}                            
                                onChange={event => inputChanged('firstName', event.target.value)}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField     
                                variant='outlined'
                                margin='normal'                                
                                fullWidth
                                label='שם משפחה'
                                autoFocus   
                                value={userDetails.lastName}   
                                onChange={event => inputChanged('lastName', event.target.value)}  
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField    
                                variant='outlined'
                                fullWidth
                                label='מספר טלפון'
                                autoFocus   
                                value={userDetails.phoneNumber} 
                                onChange={event => inputChanged('phoneNumber', event.target.value)}                         
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"                             
                                fullWidth
                                name="email"
                                label="כתובת מייל"
                                id="email"
                                value={userDetails.email}
                                onChange={event => inputChanged('email', event.target.value)} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"                             
                                fullWidth
                                name="password"
                                label="בחר סיסמה"
                                type="password"
                                id="password"
                                value={userDetails.password}
                                onChange={event => inputChanged('password', event.target.value)} 
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"                             
                                fullWidth
                                label="עיר"
                                value={userAddress.city}
                                onChange={event => addressChanged('city', event.target.value)} 
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"                             
                                fullWidth
                                label="רחוב"
                                value={userAddress.street}
                                onChange={event => addressChanged('street', event.target.value)} 
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                                variant="outlined"                             
                                fullWidth
                                type='number'
                                label="מס בית"
                                value={userAddress.numOfBuilding}
                                onChange={event => addressChanged('numOfBuilding', event.target.value)} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <Grid container justifyContent='center' >
                            <Tabs value={userDetails.userType === 'admin' ? 1 : 0} centered >
                                <Tab label='אני מתנדב' onClick={() => inputChanged('userType', 'volunteer')}
                                className={classes.tab} >

                                </Tab>  
                                <Tab label='אני מנהל'  onClick={() => inputChanged('userType', 'admin')}
                                 className={classes.tab} >

                                </Tab>

                            </Tabs>
                        </Grid>
                        </Grid>
                    </Grid>
                    <Button
                        onClick={signup}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit} 
                        style={{
                            fontFamily: 'Heebo'
                        }}
                    >
                        הירשם
                    </Button>

                </form>
            </Paper>
        </Container>
    )
}