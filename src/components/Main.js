import React from 'react'
import Login from '../pages/Login'
import Options from '../pages/admin/Options'
import useToken from '../hooks/useToken'
import useUser from '../hooks/useUser'
import Signup from '../pages/Signup'
import PrivateRoute from './PrivateRoute'
import Unauthorized from './Unauthorized'
import Tasks from '../pages/volunteer/Tasks'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Volunteers from '../pages/admin/Volunteers'
import Recipients from '../pages/admin/Recipients'
import Distributions from '../pages/admin/Distributions'
import Charts from '../pages/admin/Charts'
import AddDistribution from '../pages/admin/addDistribution/AddDistribution'
import AddRecipient from '../pages/admin/AddRecipient'

export default function Main(props) {

    const { token, setToken } = useToken()
    const { user, setUser } = useUser()


    const authenticateAdmin = () => {
        if(token && user?.userType === 'admin') {
            return true
        }

        return false
    }

    const authenticateVolunteer = () => {
        if(token && user?.userType === 'volunteer') {
            return true
        }
        
        return false
    }


    return (
        <React.Fragment>
           
            <Router>
                <Navbar user={user}/>
                <Switch>
                    <Route exact path='/'>
                        <Login setToken={setToken} setUser={setUser}/>
                    </Route>
                    <Route path='/signup'>
                        <Signup/>
                    </Route>
                    <Route        exact path='/unauthorized'         component={Unauthorized}                              />
                    <PrivateRoute exact path='/volunteers'           component={Tasks}         auth={authenticateVolunteer}/>
                    <PrivateRoute exact path='/admins'               component={Options}       auth={authenticateAdmin}    />
                    <PrivateRoute exact path='/admins/volunteers'    component={Volunteers}    auth={authenticateAdmin}    />
                    <PrivateRoute exact path='/admins/recipients'    component={Recipients}    auth={authenticateAdmin}    />
                    <PrivateRoute exact path='/admins/distributions' component={Distributions} auth={authenticateAdmin}    />
                    <PrivateRoute exact path='/admins/charts'        component={Charts}        auth={authenticateAdmin}    />
                    <PrivateRoute exact path='/admins/distributions/add'   component={AddDistribution} auth={authenticateAdmin}  />
                    <PrivateRoute exact path='/admins/recipients/add'   component={AddRecipient} auth={authenticateAdmin}    />
                </Switch>
            </Router>
            {/* <Footer/> */}
        </React.Fragment>
    )

}