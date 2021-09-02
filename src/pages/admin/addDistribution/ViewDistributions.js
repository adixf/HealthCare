import Map            from '../../../components/Map'
import React, { useState }         from 'react'
import { withStyles } from '@material-ui/styles'
import { ZoomInOutlined } from '@material-ui/icons'
import { 
    Grid, 
    Paper,
    Table,
    Button,
    TableRow,
    TableBody,
    TableCell,
    Typography, 
    TableContainer,
} from '@material-ui/core'
import DistributionDetails from '../DistributionDetails'

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        border: 'none'
      }
    }
}))(TableRow)


export default function ViewDistributions(props) {

    const getMarkers = () => {
        // return props.distributions.map(distribution => distribution.center)
        const markers = props.distributions.map(dist => ({
            lat: dist.centroId[0],
            lng: dist.centroId[1]
        }))
        console.log(markers);
        return markers
    }

    const [selectedDistribution, setSelectedDistribution] = useState(props.distributions[0])
    const [detailsOpen, setDetailsOpen] = useState(false)

    return (
        <React.Fragment>
            <DistributionDetails open={detailsOpen} distribution={selectedDistribution} close={() => setDetailsOpen(false)}/>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                <Typography variant="h6" style={{fontFamily: 'heebo'}}>
                        הנה החלוקות שיצרנו
                    </Typography>  
                </Grid>
                <Grid item xs={12}>
                   
                    <TableContainer dir='rtl' component={Paper} elevation={1} style={{ marginTop: '10px', height: 'auto', maxHeight: 150 }}>  
                        <Table size='small'>
                            <TableBody>
                            {props.distributions.map((distribution, index) => (
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
                                    <TableCell component="th" scope="row">
                                        {distribution.date}
                                    </TableCell>                        
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={12}>
                <Map 
                    googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&language=he&key=AIzaSyBawvdy5HsVO7ASDbS468AkuFtzhahW5MA'}
                    loadingElement={<div style={{ height: `100%`, backgroundColor: 'whiteSmoke' }} />}
                    containerElement={<Paper style={{ height: `350px`, borderRadius: 20 }} />}
                    mapElement={<div style={{ height: `100%`, borderRadius: 20 }}  />}
                    markers={getMarkers()}
                    center={{lat: 31.76, lng: 35.21}}
                    zoom={7}
                ></Map> 
                </Grid>
            </Grid>
        </React.Fragment>
    )
}