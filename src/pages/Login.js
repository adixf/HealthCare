import API                  from '../api'
import ErrorDialog          from '../components/ErrorDialog'
import { makeStyles }       from '@material-ui/core/styles'
import { LockOutlined }     from '@material-ui/icons'
import React, { useState }  from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { 
  Avatar, Container, Grid, Button, Paper, TextField, Typography
} from '@material-ui/core'
import useToken from '../hooks/useToken'
import useUser from '../hooks/useUser'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(6),
        opacity: '100%'
    },
    avatar: {
      marginBottom: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
}))
  

export default function Login(props) {
    const classes = useStyles()
    const history = useHistory()
    const { token } = useToken()
    const { user } = useUser()

    const [errorDialog, setErrorDialog] = useState({
      open: false,
      header: '',
      message: ''
    })

    const [userDetails, setUserDetails] = useState({
      email: '',
      password: ''
    })

    const inputChanged = (key, value) => {
      setUserDetails(state => ({
          ...state,
          [key]: value
      }))
  }

    const login = async () => {

      if(Object.values(userDetails).some(value => value === '')) {
        return setErrorDialog({
          open: true,
          header: 'שכחת משהו.',
          message: 'אנא מלא את כל השדות'
        })
      }

      if(!(await API.userExists(userDetails.email))) {
        return setErrorDialog({
          open: true,
          header: 'משהו השתבש.',
          message: 'המשתמש לא רשום במערכת'
        })
      }
      
      try {

        localStorage.clear()

        const token = await API.login(userDetails)

        props.setToken(token)

        const user = await API.getUser(token, userDetails.email)

        props.setUser(user)

        const nextPage = user.userType === 'admin' ? '/admins' : '/volunteers'

        return history.push(nextPage)

      } catch(error) {
        setErrorDialog({
          open: true,
          header: 'משהו השתבש.',
          message: 'הפרטים שהזנת שגויים'
        })
      }
  }

  
  if(token) {
    const redirect = user.userType === 'admin' ? '/admins' : '/volunteers'
    return <Redirect to={redirect}/>
  }

  return(
        <Container component='main' maxWidth='xs'> 
            <ErrorDialog 
              open={errorDialog.open} 
              header={errorDialog.header}
              error={errorDialog.message} 
              close={() => setErrorDialog({open: false, message: ''})}
            />        
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component='h1' variant='h5' style={{
                    fontFamily: 'Heebo'
                }}>
                    כניסה לחשבון
                </Typography>
                <form className={classes.form} dir='rtl'>
                    <TextField                   
                      variant='outlined'
                      margin='normal'
                      required
                      fullWidth
                      id='email'
                      label='כתובת מייל'
                      autoFocus
                      name='email'  
                      value={userDetails.email}   
                      onChange={event => inputChanged('email', event.target.value)}     
                    >
                    </TextField>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="סיסמה"
                      type="password"
                      id="password"
                      value={userDetails.password}   
                      onChange={event => inputChanged('password', event.target.value)}  
                    />
                    <Button
                      onClick={login}
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      style={{
                        fontFamily: 'Heebo'
                    }}
                  > היכנס
                  </Button>
                  <Grid container justifyContent='center'>
                    <Grid item>
                      <Link component={Button} to='/signup'>
                        {"אין לך חשבון? הירשם כאן"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
            </Paper>
        </Container>
    )
}