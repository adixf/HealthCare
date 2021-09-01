import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardMedia, CardActionArea, Typography, CardContent, IconButton, CardActions } from '@material-ui/core'
import Boxes from '../../photos/foodbox.jpg'
import Old from '../../photos/old-ppl.jpg'
import Kids from '../../photos/volunteers.jpg'
import Chart from '../../photos/charts.jpg'
import { SettingsEthernetOutlined } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(3),
        width: theme.spacing(36),
        height: theme.spacing(58),
        borderRadius: 20
        
      }
    },

    media: {
      height: 310,
      alignContent: 'bottom'
    },
    card: {
      textAlign: 'center'
    },
  
}))

export default function Options(props) {
    const classes = useStyles()
    const history = useHistory()

    return (
        <div className={classes.root}>

            <Card elevation={3} className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={Chart}
                >
                </CardMedia>                             
              </CardActionArea>  
              <CardContent style={{alignItems: 'center'}}>
                <Typography gutterBottom variant="h5"  style={{
                    fontFamily: 'Heebo',
                    fontWeight: 'bold',
                    color: '#D35D5D',
                }}>
                  סטטיסטיקה
                </Typography>
              </CardContent>  
              <CardActions style={{justifyContent: 'center'}}>
                <IconButton onClick={() => history.push('/admins/charts')}>
                  <SettingsEthernetOutlined style={{height: 45, width: 45, color: 'grey'}} />
                </IconButton>
              </CardActions>
            </Card>

            <Card elevation={3} className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={Kids}
                >
                </CardMedia>
              </CardActionArea>  
              <CardContent style={{alignItems: 'center'}}>
                <Typography gutterBottom variant="h5"  style={{
                    fontFamily: 'Heebo',
                    fontWeight: 'bold',
                    color: '#D35D5D',
                }}>
                  מתנדבים
                </Typography>
              </CardContent>  
              <CardActions style={{justifyContent: 'center'}}>
                <IconButton onClick={() => history.push('admins/volunteers')}>
                  <SettingsEthernetOutlined style={{height: 45, width: 45, color: 'grey'}} />
                </IconButton>
              </CardActions>  
            </Card>

            <Card elevation={3} className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={Old}
                >
                </CardMedia>
              </CardActionArea> 
              <CardContent style={{alignItems: 'center'}}>
                <Typography gutterBottom variant="h5"  style={{
                    fontFamily: 'Heebo',
                    fontWeight: 'bold',
                    color: '#D35D5D',
                }}>
                  נמענים
                </Typography>
              </CardContent>  
              <CardActions style={{justifyContent: 'center'}}>
                <IconButton onClick={() => history.push('admins/recipients')}>
                  <SettingsEthernetOutlined style={{height: 45, width: 45, color: 'grey'}} />
                </IconButton>
              </CardActions>     
            </Card>

            <Card elevation={3} className={classes.card}>
              <CardActionArea>
                <CardMedia 
                  className={classes.media}
                  image={Boxes}
                >
                </CardMedia>
              </CardActionArea>  
              <CardContent style={{alignItems: 'center'}}>
                <Typography gutterBottom variant="h5"  style={{
                    fontFamily: 'Heebo',
                    fontWeight: 'bold',
                    color: '#D35D5D',
                }}>
                  חלוקות
                </Typography>
              </CardContent>  
              <CardActions style={{justifyContent: 'center'}}>
                <IconButton onClick={() => history.push('admins/distributions')}>
                  <SettingsEthernetOutlined style={{height: 45, width: 45, color: 'grey'}} />
                </IconButton>
              </CardActions>    
            </Card>
      </div>
    )
}