import { Paper, Typography, Table, TableBody, TableCell, TableRow, Box, Dialog, Grid, TableContainer, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react' 
import Map   from '../../components/Map'
import { withStyles } from '@material-ui/styles'
import { CancelOutlined } from '@material-ui/icons'
import API from '../../api'
import useToken from '../../hooks/useToken'

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
}))(TableRow)

export default function DistributionDetails(props) {

    const getMarkers = () => {
        const markers = props.distribution.packages.map(pack => ({
            lat: pack.address.lat,
            lng: pack.address.lon
        }))
        return markers
    }

    return (
        <Dialog open={props.open} maxWidth>
        <Paper style={{height: 'auto', width: 'auto', padding:30}} >
            <Grid container spacing={3}>
                <Grid item xs={12} dir='rtl'>
                    <Grid container >
                        <Grid item xs={3}>
                            <IconButton onClick={props.close}>
                                <CancelOutlined color='error'/>
                            </IconButton>
                        </Grid>
                        <Grid xs={7}>
                            <Typography style={{fontFamily: "heebo", flexDirection: 'center', marginTop: '8px'}} variant='h6' dir='rtl'>
                                חבילות לחלוקה {props.distribution.date} --  מתנדב אחראי: {props.distribution.volunteerEmail}                        
                            </Typography>
                        </Grid>
                        
                    </Grid>
                    
                </Grid>
                <Grid item xs={5}>
                <Map 
                    googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&language=he&key=AIzaSyBawvdy5HsVO7ASDbS468AkuFtzhahW5MA'}
                    loadingElement={<div style={{ height: `100%`, backgroundColor: 'whiteSmoke' }} />}
                    containerElement={<Paper style={{ height: `450px`, borderRadius: 20 }} />}
                    mapElement={<div style={{ height: `100%`, borderRadius: 20 }}  />}
                    markers={getMarkers()}
                    center={getMarkers().pop()}
                    zoom={13}
                ></Map> 
                </Grid>
                <Grid item xs={7}>
                    <TableContainer dir='rtl' component={Paper} elevation={1} style={{ marginTop: '5px', height: 'auto'}}>  
                        <Table >
                            <TableBody>
                            {props.distribution.packages.map((pack, index) => (
                                <StyledTableRow key={index}>
                                   
                                    <TableCell component="th" scope="row">
                                        נמען:  {pack.recipientEmail}
                                    </TableCell>
                                    <TableCell>{}</TableCell>
                                    <TableCell>
                             
                                        {pack.address.street} {pack.address.numOfBuilding}
                                    </TableCell>
                                    <TableCell>
                           
                                        {pack.address.city}
                                    </TableCell>
                                    <TableCell>
                              
                                        {pack.content}
                                    </TableCell>
                                   
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>  
            </Grid>
        </Paper>
        </Dialog>
    )
}