import Map            from '../../../components/Map'
import React          from 'react'
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

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        border: 'none'
      }
    }
}))(TableRow)


export default function ViewDistributions(props) {
    return (
        <React.Fragment>
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
                ></Map> 
                </Grid>
            </Grid>
        </React.Fragment>
    )
}