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

export default function Message() {
    const classes = useStyles();

    return (
        <Paper elevation={5}>
            <Card className={classes.root}>
                <CardHeader
                    className={classes.cardHeader}
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            M
                        </Avatar>
                    }
                    title="Michael De Madet"
                    subheader="Envoyé le 25/10/2020 à 02h24"
                />
                <CardContent className={classes.cardContent}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your
                        guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
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