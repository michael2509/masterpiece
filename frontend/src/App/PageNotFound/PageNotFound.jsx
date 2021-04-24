import React from "react";
import "./PageNotFound.css";
import { Link } from "react-router-dom";

// page not found component
const PageNotFound = () => (
    <div id="notfound">
		<div className="notfound">
			<div className="notfound-404"></div>
			<h1>404</h1>
			<h2>Oups! La page n'a pas été trouvé</h2>
            <p>Désolé, la page que vous recherchez n'existe pas, a été supprimé, renommé ou est temporairement indisponible</p>
			<Link to="/">Retour à la page d'accueil</Link>
		</div>
	</div>
)

export default PageNotFound