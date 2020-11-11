import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Paper } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
    },
    avatar: {
        backgroundColor: blue[800],
    },
    cardHeader: {
        paddingTop: 20,
        paddingBottom: 20
    },
    cardContent: {
        paddingTop: 0,
        paddingBottom: 0
    }
}));

export default function Message({ author, message }) {
    const classes = useStyles();

    return (
        <Paper elevation={5}>
            <Card className={classes.root}>
                <CardHeader
                    className={classes.cardHeader}
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {author.toUpperCase()[0]}
                        </Avatar>
                    }
                    title={author}
                />
                <CardContent className={classes.cardContent}>
                    <Typography variant="body2" color="textSecondary" component="p">{message}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <p>11</p>
                    <IconButton aria-label="settings" style={{ marginLeft: "auto" }}>
                        <Delete />
                    </IconButton>
                </CardActions>
            </Card>
        </Paper>
    );
}