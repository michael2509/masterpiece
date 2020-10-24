import { Divider, makeStyles, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import Message from "./Message/Message";

const singleRoomStyles = makeStyles((theme) => ({
    section1: {
      margin: theme.spacing(3, 2),
    },
    section2: {
      margin: theme.spacing(2),
    },
    section3: {
      margin: theme.spacing(3, 1, 1),
    },
  }));

const SingleRoom = ({ singleRoom }) => {
    const classes = singleRoomStyles();

    return (
        <Fragment>
            <div className={classes.section1}>
                <Typography component="h1" variant="h4">{singleRoom.name ? singleRoom.name : "Non trouvé"}</Typography>
                <Typography component="h6" variant="h6" color="textSecondary">Animé par : {singleRoom.userUsername ? singleRoom.userUsername : "Non trouvé"}</Typography>
                <Typography component="h2" variant="h6" color="textSecondary">Code : {singleRoom.code ? singleRoom.code : "Non trouvé"}</Typography>
            </div>
            <Divider variant="middle" />
            <div className={classes.section2}>
                <Message />
                <Message />
                <Message />
            </div>
        </Fragment>
    )
}

export default SingleRoom;