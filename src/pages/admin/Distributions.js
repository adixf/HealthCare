import API                            from '../../api'
import useToken                       from '../../hooks/useToken'
import { useHistory }                 from 'react-router-dom'
import { makeStyles, withStyles }     from '@material-ui/core/styles'
import React, { useState, useEffect } from 'react'
import { 
    AddOutlined,
    ArrowForward, 
    PrintOutlined, 
    ZoomInOutlined, 
} from '@material-ui/icons'
import {
    Box,
    Fab,
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
import DistributionDetails from './DistributionDetails'


const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
}))(TableRow)


export default function Distributions() {
    const history = useHistory()
    const { token } = useToken()
    const [distributions, setDistributions] = useState([])
    const [delivered, setDelivered] = useState([])
    const [notDelivered, setNotDelivered] = useState([])

    useEffect(() => {
        const getDistributions = async adminEmail => {
            const distributions = await API.getAllDistributions(token)
            setDelivered(distributions.filter(distribution => distribution.isDelivered))
            setNotDelivered(distributions.filter(distribution => !distribution.isDelivered))
        }
        
        getDistributions()
    }, [])

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
                        ???????????? ??????????
                    </Typography>
                </Box>
                <Box>
                    <Fab variant='extended' style={{marginBottom: 15}} onClick={() => history.push('/admins/distributions/add')}>
                        <AddOutlined/>
                        ???????? ??????????
                    </Fab>
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
                                <Typography>?????? ???????? ??????????</Typography>
                            </Button>
                        </TableCell>
                        <TableCell alignText='right' dir='rtl' >{distribution.date}</TableCell>
                        <TableCell >
                            ?????????? ??????????: {distribution.volunteerEmail}
                        </TableCell>
                        <TableCell >
                            <IconButton color='secondary'>
                                <PrintOutlined />
                            </IconButton>
                        </TableCell>
                        <TableCell >
                            <FormControlLabel
                                control={<Checkbox checked={distribution.isDelivered} />}
                                label="???????????? ?????? ??????????"
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
                    ???????????? ????????????
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
                                <Typography>?????? ???????? ??????????</Typography>
                            </Button>
                        </TableCell>
                        <TableCell alignText='right' dir='rtl' >{distribution.date}</TableCell>
                        <TableCell >
                            ?????????? ??????????: {distribution.volunteerEmail}
                        </TableCell>
                        <TableCell >
                            <IconButton color='secodary'>
                                <PrintOutlined />
                            </IconButton>
                        </TableCell>
                        <TableCell >
                            <FormControlLabel
                                control={<Checkbox checked={distribution.isDelivered} />}
                                label="???????????? ??????????"
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