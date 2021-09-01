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
    IconButton,
    Fab,
} from '@material-ui/core'
import { ArrowForward, AddOutlined } from '@material-ui/icons'
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
    const [recipients, setRecipients] = useState([])

    useEffect(() => {
        const getRecipients = async () => {
            const recipients = await API.getAllRecipients(token)
            setRecipients(recipients)
        }

        getRecipients()
    }, [])
   
    return (
        <Container dir='rtl'>
            <Box display='flex' style={{ marginTop: '20px'}}>
                <Box>
                    <IconButton onClick={() => history.push('/admins')}>
                        <ArrowForward style={{color: 'black', fontWeight: 'bold'}}/>
                    </IconButton>
                </Box>
                <Box flexGrow={1}>
                    <Typography variant="h5" style={{
                            fontFamily: 'Heebo',
                            fontWeight: 'bold',
                            marginRight: '30px',
                            marginTop: '7px'
                        }}>
                         נמענים
                    </Typography>
                </Box>
                <Box>
                    <Fab variant='extended' style={{marginBottom: 15}} onClick={() => history.push('/admins/recipients/add')}>
                        <AddOutlined/>
                        הוסף נמען
                    </Fab>
                </Box>     
            </Box>
        <TableContainer dir='rtl' component={Paper} elevation={1} style={{ marginTop: '10px'}} className={classes.container}>
            <Table className={classes.table} dir='rtl'>
                <TableBody>
                {recipients.map((recipient, index) => (
                    <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                        {recipient.firstName}
                    </StyledTableCell>
                    <StyledTableCell  dir='rtl' >{recipient.lastName}</StyledTableCell>
                    <StyledTableCell  dir='rtl'>{recipient.email}</StyledTableCell>
                    <StyledTableCell >{recipient.phoneNumber}</StyledTableCell>
                    <StyledTableCell >{recipient.address.street} {recipient.address.numOfBuilding}, {recipient.address.city}</StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            </Container>
    )
}