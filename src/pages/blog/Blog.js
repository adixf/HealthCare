import React, { useEffect, useState } from 'react'
import { Grid, Container, Paper, Box, Typography, Fab, IconButton } from '@material-ui/core'
import Post from './Post'
import { AddOutlined, ArrowForward } from '@material-ui/icons'
import useUser from '../../hooks/useUser'
import { useHistory } from 'react-router'
import NewPost from './NewPost'
import API from '../../api'
import useToken from '../../hooks/useToken'
  
export default function Blog(props) {

    const {user} = useUser()
    const {token} = useToken()
    const history = useHistory()

    const [posts, setPosts] = useState([])

    const [newPostOpen, setNewPostOpen] = useState(false)

    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = async () => {
        const res = await API.getPosts(token, 'idanraichel@gmail.com')
        console.log(res);
        setPosts(res)
    }

    return (
        <Container>
            <NewPost update={setPosts} open={newPostOpen} close={() => setNewPostOpen(false)}/>
            <Paper style={{paddingRight: 100, marginTop: 20, paddingTop: 20, paddingLeft: 20}} dir='rtl'>
            <Box display='flex' style={{ marginTop: '20px'}}>
                <Box>
                    <IconButton onClick={() => history.push('/')}>
                        <ArrowForward style={{color: 'black', fontWeight: 'bold'}}/>
                    </IconButton>
                </Box>
                <Box flexGrow={1}>
                    <Typography variant="h5" style={{
                            fontFamily: 'Heebo',
                            fontWeight: 'bold',
                            marginRight: '30px',
                            marginTop: '7px'
                        }}>
                         היי {user.firstName}, כמה פוסטים שאולי יעניינו אותך :)
                    </Typography>
                </Box>
                {
                    user.userType === 'admin' ?
                    <Box>
                    <Fab variant='extended' style={{marginBottom: 15, marginLeft:100}} onClick={() => setNewPostOpen(true)}>
                        <AddOutlined/>
                        פוסט חדש
                    </Fab>
                    </Box>     
           
                    : <div/>
                }
                </Box>
                
                <Grid container spacing={4} style={{ marginTop: 40}}>
                {
                    posts.map((post, index) => (
                        <Grid item >
                            <Post image={post.image} key={index} index={index+1} title={post.title} body={post.body} date={post.date}/>
                        </Grid>
                    ))
                }
                </Grid>
         </Paper>
        </Container>
        
    )
}