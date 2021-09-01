import React from 'react'
import { Box, Typography } from '@material-ui/core'

export default function Footer() {
    return(
        <Box mt={3}>
        <Typography variant="body2" color="textSecondary" align="center">
            {'כל הזכויות שמורות - עמותת יד ביד  © '}
            {new Date().getFullYear()}
        </Typography>
    </Box>
    )
}