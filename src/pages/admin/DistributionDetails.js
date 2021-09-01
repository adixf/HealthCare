import { Paper, Typography, Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import React from 'react' 
import Map   from '../../../components/Map'

export default function DistributionDetails(props) {
    return (
        <Paper>
            <Grid container >
                <Grid item xs={12}>
                    <Typography>
                        חבילות לחלוקה {props.distribution.date}
                        מתנדב אחראי: {props.distribution.volunteerEmail}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                <Map 
                    googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&language=he&key=AIzaSyBawvdy5HsVO7ASDbS468AkuFtzhahW5MA'}
                    loadingElement={<div style={{ height: `100%`, backgroundColor: 'whiteSmoke' }} />}
                    containerElement={<Paper style={{ height: `350px`, borderRadius: 20 }} />}
                    mapElement={<div style={{ height: `100%`, borderRadius: 20 }}  />}
                ></Map> 
                </Grid>
                <Grid item>
                    <TableContainer dir='rtl' component={Paper} elevation={1} style={{ marginTop: '10px', height: 208}}>  
                        <Table size='small'>
                            <TableBody>
                            {props.packages.map((package, index) => (
                                <StyledTableRow key={index}>
                                   
                                    <TableCell component="th" scope="row">
                                        נמען: 
                                        {package.firstName} {package.lastName}
                                    </TableCell>
                                    <TableCell>{recipient.phoneNumber}</TableCell>
                                    <TableCell>
                                        {recipient.address.street} {recipient.address.numOfBuliding}, {recipient.address.city}
                                    </TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            disableClearable
                                            options={["מזון", "תרופות", "בגדים", "משחקים"]}
                                            renderInput={(params) => <TextField {...params}  size='small' variant="outlined" />}
                                        />
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>  
            </Grid>
        </Paper>
    )
}