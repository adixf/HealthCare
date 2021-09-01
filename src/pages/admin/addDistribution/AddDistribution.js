import API                            from '../../../api'
import BoxIcon                        from '../../../photos/box.png'
import useToken                       from '../../../hooks/useToken'
import useUser                        from '../../../hooks/useUser'
import { ArrowForward, Save }               from '@material-ui/icons'
import ChooseRecipients               from './ChooseRecipients'
import ViewDistributions              from './ViewDistributions'
import ChooseDateAndArea              from './ChooseDateAndArea'
import React, { useState, useEffect } from 'react'
import { 
  Box, 
  Icon, 
  Step, 
  Paper, 
  Avatar, 
  Button, 
  Stepper, 
  StepLabel, 
  Container, 
  Typography,  
  IconButton,
  makeStyles, 
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
    width: 800,
  },
  stepper: {
    padding: theme.spacing(3, 0, 4),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  avatar: {
    marginBottom: theme.spacing(2)
  }
}))


export default function AddDistribution(props) {
    const classes = useStyles()
    const { token } = useToken()
    const { user } = useUser()
    const history = useHistory()

    const today = () => {
      const date = new Date()
      const day =  date.getDate().toString().padStart(2, '0')
      const month = date.getMonth().toString().padStart(2, '0')
      const year = date.getFullYear()
      return `${year}-${month}-${day}`
    }

    const [date, setDate] = useState(today)
    const [recipients, setRecipients] = useState([])
    const [packages, setPackages] = useState([])

    const [distributions, setDistributions] = useState([])


    const [city, setCity] = useState('')
    const [allCitiesSelected, setAllCitiesSelected] = useState(false)
    const [cities, setCities] = useState([])
    const [allRecipients, setAllRecipients] = useState([])

    const createDistributions = async () => {
      console.log(date);
      console.log(user.email);
      console.log(packages);

      const result = await API.createDistributions(token, {
        date,
        adminEmail: user.email,
        packages
      })

      for(let i=0; i<result.length; i++) {
        const volunteerEmail = await API.findClosestVolunteer(token, result[i].packages[0].recipientEmail)
        result[i]['volunteerEmail'] = volunteerEmail
      }

      setDistributions(result)
      console.log(result);
    }

    const save = async () => {
      await API.saveDistributions(token, distributions)
    }


    useEffect(() => {
      const init = async () => {
          const allRecipients = await API.getAllRecipients(token)
          setAllRecipients(allRecipients)

          setPackages(allRecipients.map(recipient => ({
            recipientEmail: recipient.email,
            content: 'מזון'
          })))

          const cities = Array.from(new Set(allRecipients.map(recipient => recipient.address.city))) 
          setCities(cities)
      }

      init()
      
  }, [])

    const steps = ['בחר תאריך ואיזור', 'בחר נמענים', 'אשר חלוקות']

    const getStepContent = (step) => {
      switch (step) {
        case 0:
          return <ChooseDateAndArea 
                    date={date}
                    setDate={setDate}
                    cities={cities}
                    city={city}
                    setCity={setCity}
                    allCitiesSelected={allCitiesSelected}
                    setAllCitiesSelected={setAllCitiesSelected}
                />
        case 1:
          return <ChooseRecipients 
                    city={city}
                    allCitiesSelected={allCitiesSelected}
                    recipients={recipients}
                    setRecipients={setRecipients}
                    allRecipients={allRecipients}
                    setAllRecipients={setAllRecipients}
                    setPackages={setPackages}
                    packages={packages}
                />
        case 2:
          return <ViewDistributions 
                    distributions={distributions}
                />
        default:
          return <div>error</div>
      }
    }

    const [activeStep, setActiveStep] = useState(0)

    const handleNext = () => {
      setActiveStep(activeStep + 1)
    }
  
    const handleBack = () => {
      setActiveStep(activeStep - 1)
    }
  
    return (
      <Container dir='rtl' component='main' style={{width: 'auto'}} >
        <Paper className={classes.paper} >
          <Box style={{
              flexDirection: 'column',
              alignItems: 'center',
              display: 'flex'
          }}>
            <Avatar className={classes.avatar}>
              <Icon>
              <img src={BoxIcon}  height={25} width={25}/>
              </Icon>       
            </Avatar>
          </Box>

          <Typography component="h1" variant="h5" align="center" style={{fontFamily: "heebo", fontWeight: 'bold'}}>
              חלוקה חדשה
          </Typography>

          <Stepper dir='rtl' activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment >
                  <Typography variant="h5" gutterBottom>
                    חלוקה חדשה נוצרה במערכת
                  </Typography>
                  <Typography variant="subtitle1">
                      תודה על יצירת חלוקה חדשה. המתנדבים האחראיים על החלוקה יקבלו מייל על כך, ותקבל עדכונים על סטטוס החלוקה.
                  </Typography>
                  <div className={classes.buttons}>
                    <Button
                        variant="contained"
                        color="whiteSmoke"
                        onClick={() => history.push('/admins/distributions')} 
                        className={classes.button}                   
                      >חזרה</Button>
                    </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        הקודם
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={
                        async () => {
                          if(activeStep === 0) {
                            return handleNext()
                          }
                          if(activeStep === 1) {
                            await createDistributions()
                            return handleNext()
                          } 
                          else {
                            await save()
                            handleNext()
                          }
                        }
                      }
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'בקש ביצוע חלוקה' : 'הבא'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </Container>
    )
}