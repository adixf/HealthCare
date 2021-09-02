import React, { useEffect, useState } from 'react' 
import { Button, Dialog, Grid, Paper, TextField, Typography, IconButton } from '@material-ui/core'
import io from 'socket.io-client'
import useUser from '../hooks/useUser'
import { makeStyles } from '@material-ui/core';
import {SendRounded} from '@material-ui/icons'

const useStyles = makeStyles({
  dialog: {
    height: 400
  }
})

export default function Chat(props) {

    const socket = io('http://localhost:8082')

    const [messages, setMessages] = useState([
        'hello there',
        'well hi to you',
        'haha'
    ])

    useEffect(() => {
        socket.on('Message', (data) => {
            console.log(data);
        })
    })

    const classes = useStyles();

    return (

        <Dialog open={true}  classes={{
            paper: classes.dialog
          }}>
            <Paper style={{height: 400, width: 300, padding: 10, overflow: 'auto'}}>
            <Grid container spacing={2} direction='column' style={{width: '100%'}}>
            {
                messages.map(message => (
                    <Grid item xs={12}>
                        <Typography>
                            {message}
                        </Typography>
                    </Grid>
                ))
            }
            </Grid>
            </Paper>
            <Grid conainer>
            <Grid item xs={9}>
                <TextField
                    style={{bottom: 10, position: 'absolute'}}
                    
                    variant='outlined'
                ></TextField>
            </Grid>
                   
            <Grid item xs={3}>
                <IconButton
                    style={{bottom: 10, position: 'absolute',  marginBottom: 8}}
                    color="primary"
                    onClick={() => socket.emit('Message',{data: "hello"})}
                ><SendRounded/></IconButton>
            </Grid>
          
            </Grid>
           
               
        </Dialog>
    )
}
// import React, { useEffect } from 'react'
// import { ChatController, MuiChat } from 'chat-ui-react'
// import { Container, Dialog, Paper } from '@material-ui/core';
// import  io  from 'socket.io-client';

// export default function Chat() {
//     const [chatCtl] = React.useState(new ChatController());

//     const [message, setMessage] = useState('')

//     const socket = io('http://localhost')

//     useEffect(() => {
//         socket.on('message', async msg => {
//             await chatCtl.addMessage({
//                 type: 'text',
//                 content: msg,
//                 self: true,
//             });
//         })
//     })

//     React.useMemo(async () => {

//         const name = await chatCtl.setActionRequest({ type: 'text' , always: true});
//       }, [chatCtl]);


//     return (
//         <Container>
//         <Paper style={{height: 500, width: 500, bottom: 30, left:450,  position: 'absolute'}}>
//             <MuiChat chatController={chatCtl} />
//          </Paper>
//          </Container>

//     )
    
// }



