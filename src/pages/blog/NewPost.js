import { Dialog, Paper, Grid, Typography, TextField, Button } from '@material-ui/core'
import React, {useState} from 'react' 
import API from '../../api'
import useToken from '../../hooks/useToken'

export default function NewPost(props) {

    const { token } = useToken()

    const today = () => {
        const date = new Date()
        const day =  date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth()+1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${year}-${month+1}-${day}`
      }

    const [post, setPost] = useState({
        title: '',
        body: '',
        date: today(),
        adminEmail: 'idanraichel@gmail.com'
    })

    const newPost = async () => {
        console.log("hi");
        await API.newPost(token, post)
        setPost({
            title: '',
            body: '',
            date: today(),
            adminEmail: 'idanraichel@gmail.com'
        })
       
        props.close()
    }

    return (
        <Dialog open={props.open}>
            <Paper style={{height: 'auto', width: 500, padding:30, display: 'flex', alignItems: 'center'}} >
                <Grid container spacing={3} dir='rtl' justifyContent='center'>
                    <Grid item xs={12}>
                        <Typography variant='h6' style={{fontFamily: 'heebo', flexDirection: 'center'}}>
                            פוסט חדש
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            value={post.title}
                            label='כותרת'
                            onChange={event => setPost(post => ({
                                ...post,
                                title: event.target.value
                            }))}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                            fullWidth
                            multiline
                            minRows={5}
                            variant='outlined'
                            value={post.body}
                            label='תוכן'
                            onChange={event => setPost(post => ({
                                ...post,
                                body: event.target.value
                            }))}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            onClick={newPost}
                            variant="contained"
                            color="primary"
                        >יאללה לפרסם
                        </Button>
                    </Grid>

                </Grid>
            </Paper>
        </Dialog>
    )
}