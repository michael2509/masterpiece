import React from "react"
import Typography from "@material-ui/core/Typography"
import { useHistory } from "react-router-dom"

const Home = () => {
    const history = useHistory();
    history.push("/connexion");
    
    return (
        <div>
            <Typography variant="h1" align="center" >Page d'accueil</Typography>
        </div>
    )
}

export default Home;