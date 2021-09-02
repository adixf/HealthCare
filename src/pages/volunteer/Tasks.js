import API                            from '../../api'
import useToken                       from '../../hooks/useToken'
import { useHistory }                 from 'react-router-dom'
import { makeStyles, withStyles }     from '@material-ui/core/styles'
import React, { useState, useEffect } from 'react'
import { 
    ArrowForward, 
    PrintOutlined, 
    ZoomInOutlined, 
} from '@material-ui/icons'
import {
    Box,
    Table,
    Paper,
    Button,
    Checkbox,
    TableRow,
    Container,
    TableCell,
    TableBody,
    Typography,
    IconButton,
    TableContainer,
    FormControlLabel,
} from '@material-ui/core'
import useUser from '../../hooks/useUser'
import DistributionDetails from '../admin/DistributionDetails'

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
}))(TableRow)


export default function Tasks() {
    const history = useHistory()
    const { token } = useToken()
    const { user } = useUser()
    const [distributions, setDistributions] = useState([])
    const [delivered, setDelivered] = useState([])
    const [notDelivered, setNotDelivered] = useState([])

    useEffect(() => {   
        getDistributions()
    },[])

    const getDistributions = async () => {
        const all = await API.getAllDistributions(token)
        console.log(all);
        
        const filtered = all.filter(distribution => distribution.volunteerEmail === user.email)
        console.log(filtered);
        setDistributions(filtered)

        setDelivered(filtered.filter(distribution => distribution.isDelivered))
        setNotDelivered(filtered.filter(distribution => !distribution.isDelivered))
    }

    const distributionChecked = async (distribution, value) => {
        console.log("value", value);
        distribution['isDelivered'] = value
        await API.updateDistribution(token, distribution)
        await getDistributions()
    }

    const [selectedDistribution, setSelectedDistribution] = useState({
        date: '',
        adminEmail: '',
        packages: [],
        isDelivered: false
    })
    const [detailsOpen, setDetailsOpen] = useState(false)



    return (
        <Container dir='rtl'>
            <DistributionDetails open={detailsOpen} distribution={selectedDistribution} close={() => setDetailsOpen(false)}/>
            <Box display='flex' style={{ marginTop: '20px'}}>

                <Box flexGrow={1}>
                    <Typography variant="h5" style={{
                            fontFamily: 'Heebo',
                            fontWeight: 'bold',
                            marginRight: '70px',
                            
                            marginTop: '7px'
                        }}>
                        חלוקות חדשות
                    </Typography>
                </Box>     
            </Box>

            <TableContainer dir='rtl' component={Paper} elevation={1} style={{ marginTop: '10px', maxHeight: 180}}>
            <Table size='small' dir='rtl'>
                <TableBody>
                {notDelivered.map((distribution, index) => (
                    <StyledTableRow key={index}>
                        <TableCell >
                            <Button 
                             onClick={() => {
                                setSelectedDistribution(distribution)
                              
                                setDetailsOpen(true)
                            }}
                            variant='outlined' 
                            color='secondary' 
                            startIcon={<ZoomInOutlined/>}
                            style={{
                                marginRight: '80px',
                                
                            }}>
                                <Typography>הצג פרטי חלוקה</Typography>
                            </Button>
                        </TableCell>
                        <TableCell alignText='right' dir='rtl' >{distribution.date}</TableCell>
                        <TableCell >
                            מתנדב אחראי: {distribution.volunteerEmail}
                        </TableCell>
                        <TableCell >
                            <IconButton color='secondary'>
                                <PrintOutlined />
                            </IconButton>
                        </TableCell>
                        <TableCell >
                            <FormControlLabel
                                control={<Checkbox checked={distribution.isDelivered} onChange={(event) => distributionChecked(distribution, true)}/>}
                                label="החלוקה בוצעה"
                            />
                        </TableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            <Box display='flex' style={{ marginTop: '20px'}}>

                <Typography variant="h5" style={{
                        fontFamily: 'Heebo',
                        fontWeight: 'bold',
                        marginRight: '70px',
                        marginTop: '7px'
                    }}>
                    חלוקות קודמות
                </Typography>
            </Box>

            <TableContainer dir='rtl' component={Paper} elevation={1} style={{ marginTop: '10px', maxHeight: 180}}>
            <Table size='small' dir='rtl'>
                <TableBody>
                {delivered.map((distribution, index) => (
                    <StyledTableRow key={index}>
                        <TableCell >
                            <Button 
                            variant='outlined' 
                            color='secondary' 
                            startIcon={<ZoomInOutlined/>}
                            style={{
                                marginRight: '80px',
                                
                            }}>
                                <Typography>הצג פרטי חלוקה</Typography>
                            </Button>
                        </TableCell>
                        <TableCell alignText='right' dir='rtl' >{distribution.date}</TableCell>
                        <TableCell >
                            מתנדב אחראי: {distribution.volunteerEmail}
                        </TableCell>
                        <TableCell >
                            <IconButton color='secodary'>
                                <PrintOutlined />
                            </IconButton>
                        </TableCell>
                        <TableCell >
                            <FormControlLabel
                                control={<Checkbox checked={distribution.isDelivered} onChange={(event) => distributionChecked(distribution, false)}/>}
                                label="החלוקה בוצעה"
                            />
                        </TableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Container>
    )
}