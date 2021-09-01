import React, { useEffect }          from 'react'
import { withStyles } from '@material-ui/styles'
import { 
    Grid, 
    Table, 
    Paper,
    Checkbox, 
    TableRow,
    TableBody,
    TableCell,
    TextField,
    Typography, 
    TableContainer,
    FormControlLabel, 
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'


const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        border: 'none'
      }
    }
}))(TableRow)


export default function ChooseRecipients(props) {

    useEffect(() => {
        const setRecipients = () => {
            if(!props.allCitiesSelected) {
                console.log(props.city);
                props.setAllRecipients(props.allRecipients.filter(recipient => recipient.address.city === props.city))
            }

        }
        setRecipients()
    }, [])

    const selectionChanged = (chosen, value) => {
        if(value) {
            return props.setRecipients(recipients => ([
                ...recipients,
                chosen
            ]))
        }

        const filtered = props.recipients.filter(recipient => recipient.email !== chosen.email)
        props.setRecipients(filtered)
    }

    const packageSelected = (recipient, content) => {
        props.setPackages(props.packages.map(pack => {
            if(pack.recipientEmail === recipient.email) {
                return {...pack, content}
            }
            return pack
        })
    )}

    const SelectAll = value => {
        if(value) {
            props.setRecipients(props.allRecipients)
        }

        else props.setRecipients([])
    }
    
    const contains = recipient => {
        return props.recipients.some(rec => rec.email === recipient.email)
    }

    return (
        <React.Fragment>
            <Grid container spacing={1} dir='rtl' >
                <Grid item xs={6}>
                <Typography variant="h6" style={{fontFamily: 'heebo'}}>
                          בחר נמענים 
                    </Typography>
                </Grid>
                <Grid item xs={3}/>
                <Grid item xs={3}>
                    <FormControlLabel
                        control={<Checkbox onChange={event => SelectAll(event.target.checked)}/>}
                        label="בחר הכל"
                        labelPlacement='start'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TableContainer dir='rtl' component={Paper} elevation={1} style={{ marginTop: '10px', height: 208}}>  
                        <Table size='small'>
                            <TableBody>
                            {props.allRecipients.map((recipient, index) => (
                                <StyledTableRow key={index}>
                                    <TableCell >
                                        <Checkbox 
                                            onClick={event => selectionChanged(recipient, event.target.checked) }
                                            checked={contains(recipient)}                                
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {recipient.firstName} {recipient.lastName}
                                    </TableCell>
                                    <TableCell>{recipient.phoneNumber}</TableCell>
                                    <TableCell>
                                        {recipient.address.street} {recipient.address.numOfBuliding}, {recipient.address.city}
                                    </TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            disableClearable
                                            defaultValue='מזון'
                                            onChange={(event, value) => packageSelected(recipient, value)}
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
        </React.Fragment>
    )
}