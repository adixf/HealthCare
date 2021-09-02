import React, { useState, useEffect } from 'react'
import { TextField, Typography, Grid, FormControlLabel, Checkbox } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'


export default function ChooseDateAndArea(props) {

    return (
        <React.Fragment>
            <Grid container spacing={1} dir='rtl'>
                
                <Grid item xs={12}>
                    <Typography variant="h6" style={{fontFamily: 'heebo'}}>
                          בחר תאריך לחלוקה
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        inputProps={{min: 0, style: { textAlign: 'right' }}}
                        variant='outlined'
                        type="date"
                        fullWidth
                        value={props.date}
                        onChange={event => props.setDate(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" style={{fontFamily: 'heebo'}} xs={12}>
                          בחר איזור לחלוקה
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel control=
                    {
                        <Checkbox 
                            checked={props.allCitiesSelected} 
                            onClick={event => {
                                props.setAllCitiesSelected(event.target.checked)
                            }}
                        />
                    }
                        label="כל הארץ"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete 
                        disabled={props.allCitiesSelected}
                        options={props.cities}
                        fullWidth
                        disableClearable
                        value={props.city}
                        blurOnSelect
                        onChange={(event, value) => props.setCity(value)}
                        renderInput={(params) => <TextField {...params}  label="בחר איזור חלוקה" variant="outlined" />}
                    />
                </Grid>
            </Grid>
                
        </React.Fragment>
      
    )
}