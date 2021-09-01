import React, { useEffect, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import 
{ 
    Table, 
    Box, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableRow, 
    Paper, 
    Container, 
    Typography, 
    IconButton
} from '@material-ui/core'
import { ArrowForward } from '@material-ui/icons'
import API from '../../api'
import useToken from '../../hooks/useToken'
import { useHistory } from 'react-router-dom'

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: 'grey',
      color: theme.palette.common.white,
      borderColor: theme.palette.secondary.main,
      borderWidth: '3px'
    },
    body: {
      fontSize: 14,
    },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
}))(TableRow)

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 850,
        width: 1250
    },
    container: {
        maxHeight: 435,
        width: 1250,
        
    }
}))

export default function Volunteers(props) {

    const classes = useStyles()
    const history = useHistory()
    const { token } = useToken()
    const [volunteers, setVolunteers] = useState([])

    useEffect(() => {
        const getVolunteers = async () => {
            const volunteers = await API.getAllVolunteers(token)
            setVolunteers(volunteers)
        }

        getVolunteers()
    }, [])
   
    return (
        <Container dir='rtl'>
            <Box display='flex' style={{ marginTop: '20px'}}>
            <IconButton onClick={() => history.push('/admins')}>
                <ArrowForward style={{color: 'black', fontWeight: 'bold'}}/>
            </IconButton>
            <Typography variant="h5" style={{
                    fontFamily: 'Heebo',
                    fontWeight: 'bold',
                    marginRight: '30px',
                    marginTop: '7px'
                }}>
                מתנדבים
            </Typography>
            </Box>
           
        <TableContainer dir='rtl' component={Paper} elevation={1} style={{ marginTop: '10px'}} className={classes.container}>
            <Table className={classes.table} dir='rtl'>
                <TableBody>
                {volunteers.map((volunteer, index) => (
                    <StyledTableRow key={index}>
    
                    <StyledTableCell component="th" scope="row">
                        {volunteer.firstName}
                    </StyledTableCell>
                    <StyledTableCell >{volunteer.lastName}</StyledTableCell>
                    <StyledTableCell >{volunteer.email}</StyledTableCell>
                    <StyledTableCell >{volunteer.phoneNumber}</StyledTableCell>
                    <StyledTableCell >{volunteer.address.street} {volunteer.address.numOfBuilding}, {volunteer.address.city}</StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            </Container>
    )
}