import React, { useEffect } from 'react' 
import { Grid } from '@material-ui/core'
import io from 'socket.io-client'
import useUser from '../hooks/useUser'

let socket

export default function Chat() {

    const { user } = useUser()

    const CHAT_ENDPOINT = 'localhost:8082/chat'

    useEffect(() => {
        socket = io(CHAT_ENDPOINT)

        socket.emit('join', user.email, () => {

        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [CHAT_ENDPOINT])

    return (

    )
}