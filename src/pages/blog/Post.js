import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import postImage1 from '../../photos/postImage1.jpg'
import postImage2 from '../../photos/postImage2.jpg'
import postImage3 from '../../photos/postImage3.jpg'
import postImage4 from '../../photos/postImage4.jpg'
import postImage5 from '../../photos/postImage5.jpg'
import postImage6 from '../../photos/postImage6.jpg'
import postImage7 from '../../photos/postImage7.jpg'
import postImage8 from '../../photos/postImage8.jpg'
import postImage9 from '../../photos/postImage9.jpg'
import postImage10 from '../../photos/postImage10.jpg'
import postImage11 from '../../photos/postImage11.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

export default function Post(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const images = [
      postImage3,
      postImage2,
      postImage4,
      postImage1,
      postImage5,
      postImage6,
      postImage7,
      postImage8,
      postImage9,
      postImage10,
      postImage11,
      postImage1,
      postImage2,
      postImage3,
      postImage4,
      postImage5,
      postImage6,
      postImage7,
      postImage8,
      postImage9,
      postImage10,
      postImage11,
      postImage1,
      postImage2,
      postImage3,
      postImage4,
      postImage5,
      postImage3,
      postImage4,
      postImage5,  
  ]

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.root} dir='rtl' style={{backgroundColor: 'whitesmoke'}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.index}
          </Avatar>
        }
       
        title={props.title}
        subheader={`עידן רייכל, ${props.date}`}
      />
      <CardMedia
        className={classes.media}
        image={images[props.index]}
        title="post"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
            {props.subTitle}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Typography variant="body2" color="textPrimary">קרא פוסט</Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>היי חברים,</Typography>
          <Typography paragraph>
            {props.body}
          </Typography>         
          <Typography>
            שלכם, עידן
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

