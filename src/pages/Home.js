import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import Navbar from '../components/Navbar'
import { Box, Typography } from '@material-ui/core'
import SuccessDialog from '../components/SuccessDialog'
import ErrorDialog from '../components/ErrorDialog'
import AdminMain from './admin/AdminMain'


export default function Home() {
    const [step, setStep] = useState(0)

    const showLogin = () => {
        setStep(0)
    }

    const showSignup = () => {
        setStep(1)
    }

    const showAdminOptions = () => {
        setStep(2)
    }


    const login = (mail, password) => {
        // if user exists error dialog
        if(true) {
            setCurrentUser({
                firstName: "שחר",
                lastName: "פרידמן"
            })
        }
        // display content 
        showAdminOptions()
    }

    const [currentUser, setCurrentUser] = useState({
        firstName: "לא",
        lastName: "רשום"
    })

    
    const validAddress = (city, street, streetNum) => {
        // validate address
        return true
    }

    const userExists = mail => {
        // validate user exists
        return false
    }


    const signup = userDetails => {
        if(Object.values(userDetails).some(val => val === '')) {
            setErrorMessage('אנא מלא את כל השדות')
            return setErrorDialogOpen(true)
        }
        if(!validAddress(userDetails.city, userDetails.street, userDetails.streetNum)) {

            setErrorMessage('הכתובת שהזנת לא קיימת')
            return setErrorDialogOpen(true)
        }
        if(userExists(userDetails.mail)) {
            setErrorMessage('המשתמש כבר קיים במערכת')
            return setErrorDialogOpen(true)
        }

        // signup

        setSuccessDialogOpen(true)
    }

    const [successDialogOpen, setSuccessDialogOpen] = useState(false)
    const [errorDialogOpen, setErrorDialogOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const renderSwitch = () => {
        switch (step) {
            case 0:
                return  <Login  
                            login={login}
                            showSignup={showSignup} 
                        />
            case 1: 
                return  <Signup 
                            showLogin={showLogin} 
                            signup={signup}
                        />  
                        
            case 2:
                return  <AdminMain
                
                        />

            default:
                return <div>error</div>
        }
    }

    return (
        <Box dispaly='flex'>
            <SuccessDialog 
                open={successDialogOpen} 
                close={() => {
                    setSuccessDialogOpen(false)
                    showLogin()
                }}></SuccessDialog>
            <ErrorDialog open={errorDialogOpen} error={errorMessage} close={() => setErrorDialogOpen(false)}></ErrorDialog>
            <Navbar username={`${currentUser.firstName} ${currentUser.lastName}`}  showLogin={showLogin} />
            {
                renderSwitch()
            }
            <Box mt={3}>
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © '}
                    {new Date().getFullYear()}
                </Typography>
            </Box>
        </Box>
    )
}