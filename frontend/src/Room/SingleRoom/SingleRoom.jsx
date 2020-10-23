import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";

const SingleRoom = ({ singleRoom }) => {
    
    return (
        <Fragment>
            <Typography component="h1" variant="h4">Salon : {singleRoom.name ? singleRoom.name : "Non trouvé"}</Typography>
            <Typography component="h6" variant="h6">Animé par : {singleRoom.userUsername ? singleRoom.userUsername : "Non trouvé"}</Typography>
            <Typography component="h2" variant="h6">Code : {singleRoom.code ? singleRoom.code : "Non trouvé"}</Typography>
        </Fragment>
    )
}

export default SingleRoom;